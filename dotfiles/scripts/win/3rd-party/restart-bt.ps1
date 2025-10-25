<#

ExecutionPolicies
------------------
AllSigned
Bypass
Default
RemoteSigned
Restricted
Undefined
Unrestricted

---

Scope              ExecutionPolicy
--------------     ----------------
MachinePolicy      Undefined
UserPolicy         Undefined
Process            Undefined
CurrentUser        RemoteSigned
LocalMachine       AllSigned

---

Command
---------------------------------------------------------------------
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

#>



##### START ELEVATE TO ADMIN #####
param(
    [Parameter(Mandatory=$false)]
    [switch]$shouldAssumeToBeElevated,

    [Parameter(Mandatory=$false)]
    [String]$workingDirOverride
)

# If parameter is not set, we are propably in non-admin execution.
# We set it to the current working directory so that the working
# directory of the elevated execution of this script is the current
# working directory
if(-not($PSBoundParameters.ContainsKey('workingDirOverride')))
{
    $workingDirOverride = (Get-Location).Path
}

function Test-Admin {
    $currentUser = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())
    $currentUser.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}

# If we are in a non-admin execution. Execute this script as admin.
if ((Test-Admin) -eq $false)  {
    if ($shouldAssumeToBeElevated) {
        Write-Output "Elevating did not work :("

    } else {
        # add `-noexit` to the ArgumentList for better debugging
        Start-Process powershell.exe -Verb RunAs -ArgumentList ('-noprofile -file "{0}" -shouldAssumeToBeElevated -workingDirOverride "{1}"' -f ($myinvocation.MyCommand.Definition, "$workingDirOverride"))
    }
    exit
}

Set-Location "$workingDirOverride"
##### END ELEVATE TO ADMIN #####

# Add actual commands to be executed in elevated mode here:
Write-Output "I get executed in an Admin PowerShell"

Get-Service -DisplayName *Bluetooth* | Restart-Service -Force
