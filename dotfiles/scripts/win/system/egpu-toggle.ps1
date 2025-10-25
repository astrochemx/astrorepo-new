# Check if the Script is running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    # Relaunch the Script as Administrator
    Start-Process -FilePath PowerShell.exe -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# Set the Names of the Internal GPU and the External GPU
$iGPU_NAME = "AMD Radeon(TM) 780M"
$eGPU_NAME = "NVIDIA GeForce RTX 2070 SUPER"

# Check if the External GPU is connected
Write-Output "Checking for External GPU..."
if (Get-PnpDevice | Where-Object { $_.FriendlyName -like "*${eGPU_NAME}*" }) {
    Write-Output "External GPU (${eGPU_NAME}) detected."
    $iGPU_DEVICE = Get-PnpDevice | Where-Object { $_.FriendlyName -like "*${iGPU_NAME}*" }
    if ($iGPU_DEVICE) {
        Write-Output "Internal GPU (${iGPU_NAME}) detected."
        if ($iGPU_DEVICE.Status -eq "OK") {
            Write-Output "Internal GPU is currently enabled."
            # $confirmDisable = Read-Host "Do you want to disable the Internal GPU? (Y/N)"
			$confirmDisable = "Y"
            if ($confirmDisable -eq "Y" -or $confirmDisable -eq "y") {
                Write-Output "Disabling Internal GPU..."
                Disable-PnpDevice -InstanceId $iGPU_DEVICE.InstanceId -Confirm:$false
                Write-Output "Internal GPU disabled."
            }
            else {
                Write-Output "Internal GPU not disabled."
            }
        }
        else {
            Write-Output "Internal GPU is already disabled."
            # $confirmEnable = Read-Host "Do you want to enable the Internal GPU? (Y/N)"
			$confirmEnable = "Y"
            if ($confirmEnable -eq "Y" -or $confirmEnable -eq "y") {
                Write-Output "Enabling Internal GPU..."
                Enable-PnpDevice -InstanceId $iGPU_DEVICE.InstanceId -Confirm:$false
                Write-Output "Internal GPU enabled."
            }
            else {
                Write-Output "Internal GPU not enabled."
            }
        }
    }
    else {
        Write-Output "Internal GPU (${iGPU_NAME}) not detected."
    }
}
else {
    Write-Output "External GPU (${eGPU_NAME}) not detected."
    $iGPU_DEVICE = Get-PnpDevice | Where-Object { $_.FriendlyName -like "*${iGPU_NAME}*" }
    if ($iGPU_DEVICE) {
        Write-Output "Internal GPU (${iGPU_NAME}) detected."
        if ($iGPU_DEVICE.Status -ne "OK") {
            Write-Output "Internal GPU is currently disabled."
            $confirmEnable = Read-Host "Do you want to enable the Internal GPU? (Y/N)"
            if ($confirmEnable -eq "Y" -or $confirmEnable -eq "y") {
                Write-Output "Enabling Internal GPU..."
                Enable-PnpDevice -InstanceId $iGPU_DEVICE.InstanceId -Confirm:$false
                Write-Output "Internal GPU enabled."
            }
            else {
                Write-Output "Internal GPU not enabled."
            }
        }
        else {
            Write-Output "Internal GPU is already enabled."
        }
    }
    else {
        Write-Output "Internal GPU (${iGPU_NAME}) not detected."
    }
}
