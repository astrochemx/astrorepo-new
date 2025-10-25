<#
.SYNOPSIS
  Recursively optimize (losslessly) PNGs using oxipng.
  Outputs optimized files into a sibling folder named "<input_folder_name>_OXIed", preserving subfolder structure.

DESCRIPTION
  - For each input path (folder or file) it will create a sibling folder named:
      "<input_folder_name>_OXIed"
    and place PNGs inside, preserving subfolder structure.
  - Default optimization level is 6 unless a numeric level is provided as the final argument.

USAGE
  - Drag-and-drop one or more folder(s) or file(s) onto a .bat wrapper that calls this script.
  - Or run manually:
      powershell -NoProfile -ExecutionPolicy Bypass -File .\optimize_pngs.ps1 "C:\path\to\folder" 6
    (last numeric argument 1-6 is treated as optimization level if present; default = 6)
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

function Find-Oxipng {
    # Try PATH first:
    $cmd = Get-Command oxipng -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Path }

    $scriptDir = Get-ScriptDir
    # Common install locations:
    $candidates = @(
		[System.IO.Path]::Combine($scriptDir, 'oxipng.exe'),
        [System.IO.Path]::Combine($scriptDir, 'bin', 'oxipng.exe'),
        [System.IO.Path]::Combine($scriptDir, 'oxipng', 'oxipng.exe'),
        [System.IO.Path]::Combine($scriptDir, 'oxipng', 'bin', 'oxipng.exe'),
        "$env:ProgramFiles(x86)\oxipng\bin\oxipng.exe",
        "$env:ProgramFiles(x86)\oxipng\oxipng.exe",
        "$env:ProgramFiles\oxipng\bin\oxipng.exe",
        "$env:ProgramFiles\oxipng\oxipng.exe",
        "$env:ProgramData\chocolatey\bin\oxipng.exe",
        "$env:USERPROFILE\.cargo\bin\oxipng.exe",
        "$env:USERPROFILE\scoop\shims\oxipng.exe"
    )

    foreach ($c in $candidates) {
        if ([string]::IsNullOrWhiteSpace($c)) { continue }
        if (Test-Path $c) {
            try { return (Resolve-Path $c -ErrorAction Stop).Path } catch { return $c }
        }
    }

    return $null
}

# Helper to quote an argument safely
function Quote-Arg([string]$s) {
    # Escape any embedded double quotes and wrap in quotes
    return '"' + ($s -replace '"', '\"') + '"'
}

# Default optimization level
$level = 'max'

# If last argument is a digit 1-6, treat it as level and remove from Paths
if ($Paths -and ($Paths[-1] -match '^([1-6]|max)$')) {
    $level = $Paths[-1]
    if ($Paths.Count -gt 1) {
        $Paths = $Paths[0..($Paths.Count - 2)]
    } else {
        $Paths = @()
    }
}

if (-not $Paths -or $Paths.Count -eq 0) {
    Write-Host "No input paths supplied. Drag folder(s) or file(s) onto the .bat wrapper or run with a path."
    Write-Host "Usage examples:"
    Write-Host "  Drag folder(s) onto optimize_pngs.bat (uses default level 6)"
    Write-Host "  powershell -NoProfile -ExecutionPolicy Bypass -File .\optimize_pngs.ps1 `"$PWD\my_pngs`" 6"
    exit 1
}

$oxPath = Find-Oxipng
if (-not $oxPath) {
    Write-Error "oxipng executable not found. Place oxipng.exe next to this script, or install/add it to PATH."
    exit 2
}

Write-Host "Using oxipng: $oxPath (optimization level: $level)"
Write-Host ""

function Run-Process-Collect([string]$exe, [string[]]$arguments) {
    # Build command line with properly quoted args
    $quoted = $arguments | ForEach-Object { Quote-Arg $_ }
    $argumentString = [string]::Join(' ', $quoted)

    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = $exe
    $startInfo.Arguments = $argumentString
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError  = $true
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true

    $proc = New-Object System.Diagnostics.Process
    $proc.StartInfo = $startInfo

    $stdout = $null
    $stderr = $null
    $exit = -1

    try {
        $proc.Start() | Out-Null
        $stdout = $proc.StandardOutput.ReadToEnd()
        $stderr = $proc.StandardError.ReadToEnd()
        $proc.WaitForExit()
        $exit = $proc.ExitCode
    } catch {
        throw $_
    } finally {
        if ($proc -and -not $proc.HasExited) {
            $proc.Kill()
        }
        $proc.Dispose()
    }

    return [PSCustomObject]@{
        ExitCode = $exit
        StdOut   = $stdout
        StdErr   = $stderr
    }
}

function Optimize-To-Out([System.IO.FileInfo]$inputFile, [string]$outFilePath) {
    # Ensure directory exists
    $outDir = [System.IO.Path]::GetDirectoryName($outFilePath)
    if (-not (Test-Path $outDir)) {
        New-Item -ItemType Directory -Path $outDir -Force | Out-Null
    }

    # Capture original timestamp
    try {
        $origTime = $inputFile.LastWriteTime
    } catch {
        $origTime = $null
    }

    Write-Host "Optimizing:`n  Source: $($inputFile.FullName)`n  Target: $outFilePath"

    # Build arguments: --out <out> --opt <level> --strip safe --preserve <in>
    $args = @('--out', $outFilePath, '--opt', $level.ToString(), '--strip', 'safe', '--preserve', $inputFile.FullName)

    $result = Run-Process-Collect -exe $oxPath -arguments $args

    if ($result.StdOut) {
        $result.StdOut.TrimEnd() | ForEach-Object { Write-Host "  $_" }
    }
    if ($result.StdErr) {
        $result.StdErr.TrimEnd() | ForEach-Object { Write-Warning "  $_" }
    }

    if ($result.ExitCode -ne 0) {
        Write-Warning "oxipng returned exit code $($result.ExitCode) for $($inputFile.FullName)"
        return $false
    }

    # Restore timestamp on the generated file to match original
    if ($origTime -ne $null) {
        try {
            Set-ItemProperty -Path $outFilePath -Name LastWriteTime -Value $origTime -ErrorAction SilentlyContinue
        } catch {
            # ignore
        }
    }

    # Report size
    try {
        $newSize = (Get-Item $outFilePath).Length
        Write-Host ("  -> Done. Size: {0} KB" -f [math]::Round($newSize/1024,2))
    } catch {}
    return $true
}

# Normalize input root helper to ensure consistent trimming
function Normalize-Path-NoTrailingSlash([string]$p) {
    if (-not $p) { return $p }
    return $p.TrimEnd([IO.Path]::DirectorySeparatorChar, [IO.Path]::AltDirectorySeparatorChar)
}

# Process each provided path
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

    $item = Get-Item $input -ErrorAction SilentlyContinue
    if (-not $item) { continue }

    if ($item.PSIsContainer) {
        # Input is a folder: create sibling output folder named <input_folder_name>_OXIed
        $inputRoot = Normalize-Path-NoTrailingSlash $input
        $baseName = [System.IO.Path]::GetFileName($inputRoot)
        if ([string]::IsNullOrWhiteSpace($baseName)) {
            $baseName = (Get-Item $inputRoot).Name
        }
        $parent = [System.IO.Path]::GetDirectoryName($inputRoot)
        if ([string]::IsNullOrWhiteSpace($parent)) { $parent = (Get-Location).Path }

        $parent = [string]$parent
        $baseName = [string]$baseName

        $outputRoot = [System.IO.Path]::Combine($parent, "${baseName}_OXIed")

        Write-Host "Processing folder: $input"
        Write-Host "Output root: $outputRoot"

        # Collect PNGs recursively
        $pngs = Get-ChildItem -Path $input -Filter *.png -Recurse -File -ErrorAction SilentlyContinue
        if (-not $pngs -or $pngs.Count -eq 0) {
            Write-Host "No PNG files found in $input. Skipping."
            continue
        }

        $i = 0
        foreach ($f in $pngs) {
            $i++
            # Compute relative path to preserve structure
            $full = $f.FullName
            $trimmedRoot = Normalize-Path-NoTrailingSlash $inputRoot
            $rel = $full.Substring($trimmedRoot.Length).TrimStart('\','/')

            $relDir = [System.IO.Path]::GetDirectoryName($rel)
            if ($relDir -and -not [string]::IsNullOrWhiteSpace($relDir)) {
                $outDir = [System.IO.Path]::Combine($outputRoot, [string]$relDir)
            } else {
                $outDir = $outputRoot
            }

            $outDir = [string]$outDir
            $outFile = [System.IO.Path]::Combine($outDir, $f.Name)

            Write-Host "[$i/$($pngs.Count)]"
            Optimize-To-Out $f $outFile | Out-Null
        }

        Write-Host "Finished optimizing $($pngs.Count) PNG(s) from: $input`n"
    } else {
        # Single file case
        if ($input -match '\.png$' -or $input -match '\.PNG$') {
            $fileParent = [System.IO.Path]::GetDirectoryName($input)
            $baseName = [System.IO.Path]::GetFileNameWithoutExtension($input)
            $fileParent = [string]$fileParent
            $baseName = [string]$baseName
            $outputRoot = [System.IO.Path]::Combine($fileParent, "${baseName}_OXIed")
            New-Item -ItemType Directory -Path $outputRoot -Force | Out-Null

            $inFile = Get-Item $input
            $outFile = [System.IO.Path]::Combine($outputRoot, $inFile.Name)

            Write-Host "Processing single file: $input"
            Write-Host "Output root: $outputRoot"
            Optimize-To-Out $inFile $outFile | Out-Null

            Write-Host "Finished optimizing: $input`n"
        } else {
            Write-Warning "Single file given is not a PNG: $input; skipping."
            continue
        }
    }
}

Write-Host "All done."
