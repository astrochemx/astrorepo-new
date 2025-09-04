mise activate pwsh

$shimPath = "$env:USERPROFILE\AppData\Local\mise\shims"
$currentPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$newPath = $currentPath + ";" + $shimPath

[Environment]::SetEnvironmentVariable('Path', $newPath, 'User')

if (-not (Test-Path $profile)) { New-Item $profile -Force }
echo 'mise activate pwsh | Out-String | Invoke-Expression' >> $HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
Invoke-Item $profile
