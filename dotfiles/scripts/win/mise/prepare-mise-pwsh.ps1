$shimPath = "$env:USERPROFILE\AppData\Local\mise\shims"
$currentPath = [Environment]::GetEnvironmentVariable('Path', 'User')

$newPath = $currentPath + ";" + $shimPath

# Modify User $Path environment variable
[Environment]::SetEnvironmentVariable('Path', $newPath, 'User')

# Activate MISE
Write-Output (&mise activate pwsh) | Out-String | Invoke-Expression
