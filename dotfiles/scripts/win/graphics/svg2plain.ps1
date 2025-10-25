<#
.SYNOPSIS
  Recursively converts SVGs using Inkscape.
  Outputs converted files into a sibling folder named "<input_folder_name>_PlainSVGs", preserving subfolder structure.

DESCRIPTION
  - For each input path (folder or file) it will create a sibling folder named:
      "<input_folder_name>_PlainSVGs"
    and place Plain SVGs inside, preserving subfolder structure.

USAGE
  - Drag-and-drop one or more folder(s) onto svg2plain.bat (which calls this).
  - Or run manually:
      powershell -NoProfile -ExecutionPolicy Bypass -File .\svg2plain.ps1 "C:\path\to\folder"
#>

param(
    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$Paths
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Get-ScriptDir {
    if ($PSScriptRoot) { return $PSScriptRoot }
    return Split-Path -Parent $MyInvocation.MyCommand.Definition
}

function Find-Inkscape {
    # Try PATH first:
    $cmd = Get-Command inkscape -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Path }

	$scriptDir = Get-ScriptDir
    # Common install locations:
    $candidates = @(
		[System.IO.Path]::Combine($scriptDir, 'inkscape.exe'),
        [System.IO.Path]::Combine($scriptDir, 'bin', 'inkscape.exe'),
		[System.IO.Path]::Combine($scriptDir, 'inkscape', 'inkscape.exe'),
        [System.IO.Path]::Combine($scriptDir, 'inkscape', 'bin', 'inkscape.exe'),
        "$env:ProgramFiles(x86)\Inkscape\bin\inkscape.exe",
        "$env:ProgramFiles(x86)\Inkscape\inkscape.exe"
        "$env:ProgramFiles\Inkscape\bin\inkscape.exe",
        "$env:ProgramFiles\Inkscape\inkscape.exe",
        "$env:ProgramData\chocolatey\bin\inkscape.exe",
        "$env:USERPROFILE\scoop\shims\inkscape.exe"
    )

    foreach ($c in $candidates) {
        if ([string]::IsNullOrWhiteSpace($c)) { continue }
        if (Test-Path $c) {
            try { return (Resolve-Path $c -ErrorAction Stop).Path } catch { return $c }
        }
    }

    return $null
}

# If last argument is purely numeric, treat as DPI and remove it from Paths
$DPI = 96
if ($Paths -and ($Paths[-1] -match '^\d+$')) {
    $DPI = [int]$Paths[-1]
    if ($Paths.Count -gt 1) {
        $Paths = $Paths[0..($Paths.Count - 2)]
    } else {
        $Paths = @()
    }
}

if (-not $Paths -or $Paths.Count -eq 0) {
    Write-Host "No input paths supplied. Drag folders onto svg2plain.bat or run with a path."
    Write-Host "Usage examples:"
    Write-Host "  Drag folder(s) onto svg2plain.bat"
    Write-Host "  powershell -NoProfile -ExecutionPolicy Bypass -File .\svg2plain.ps1 `"$PWD\my_svgs`""
    exit 1
}

$inkPath = Find-Inkscape
if (-not $inkPath) {
    Write-Error "Inkscape not found. Please install Inkscape or add it to PATH."
    exit 2
}

# Determine Inkscape major version (1+ has the new CLI)
$inkVerOut = & $inkPath --version 2>&1
[int]$inkMajor = 0
if ($inkVerOut -match '([0-9]+)\.') {
    $inkMajor = [int]$matches[1]
}

Write-Host "Using Inkscape: $inkPath ($inkVerOut)."
Write-Host ""

foreach ($raw in $Paths) {
    try {
        $input = [System.IO.Path]::GetFullPath($raw)
    } catch {
        Write-Warning "Skipping invalid path: $raw"
        continue
    }

    if (-not (Test-Path $input)) {
        Write-Warning "Path not found: $input"
        continue
    }

    if ((Get-Item $input).PSIsContainer) {
        $inputRoot = $input.TrimEnd('\','/')
        $baseName = [System.IO.Path]::GetFileName($inputRoot)
        if (-not $baseName) {
            # If root like "C:\", use volume name
            $baseName = (Get-Item $inputRoot).Name
        }
        $parent = [System.IO.Path]::GetDirectoryName($inputRoot)
        if (-not $parent) {
            # fallback to same folder
            $parent = $PWD.Path
        }
        $outputRoot = Join-Path $parent ("${baseName}_PlainSVGs")
    } else {
        # Single file case: input is a file
        $fileParent = [System.IO.Path]::GetDirectoryName($input)
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($input)
        $outputRoot = Join-Path $fileParent ("${baseName}_PlainSVGs")
        # Set inputRoot to the file's parent so relative path logic works
        $inputRoot = $fileParent
    }

    Write-Host "Processing input: $input"
    Write-Host "Output folder will be: $outputRoot"

    # Create output root
    New-Item -ItemType Directory -Path $outputRoot -Force | Out-Null

    # Collect SVG files (if input was a single file, only that file)
    if ((Get-Item $input).PSIsContainer) {
        $svgs = Get-ChildItem -Path $input -Filter *.svg -Recurse -File -ErrorAction SilentlyContinue
    } else {
        $svgs = @()
        if ($input -match '\.svg$' -or $input -match '\.SVG$') {
            $svgs += Get-Item -Path $input
        } else {
            Write-Warning "Single file given is not an SVG: $input; skipping."
        }
    }

    if (-not $svgs -or $svgs.Count -eq 0) {
        Write-Host "No SVG files found in $input. Skipping."
        continue
    }

    $count = 0
    foreach ($file in $svgs) {
        $count++
        # Compute relative path from inputRoot
        $full = $file.FullName
        $rel = $full.Substring($inputRoot.Length).TrimStart('\','/')
        $relDir = [System.IO.Path]::GetDirectoryName($rel)
        if ($relDir) {
            $outDir = Join-Path $outputRoot $relDir
        } else {
            $outDir = $outputRoot
        }
        New-Item -ItemType Directory -Path $outDir -Force | Out-Null

        $outFileName = [System.IO.Path]::ChangeExtension($file.Name, '.svg')
        $outFile = Join-Path $outDir $outFileName

        Write-Host "[$count/$($svgs.Count)] -> $rel  -> $outFile"

        # Inkscape 1.x+ CLI
        # Use: inkscape "in.svg" --export-plain-svg --export-type=svg --export-filename="out.svg"
        try {
            & $inkPath $file.FullName "--export-plain-svg" "--export-type=svg" "--export-filename=$outFile"
            if ($LASTEXITCODE -ne 0) {
                Write-Warning "Inkscape returned exit code $LASTEXITCODE for $($file.FullName)"
            }
        } catch {
            Write-Warning "Failed converting $($file.FullName) with inkscape 1.x CLI: $_"
        }
    }

    Write-Host "Finished processing $($svgs.Count) SVGs from: $input`n"
}

Write-Host "All done."
