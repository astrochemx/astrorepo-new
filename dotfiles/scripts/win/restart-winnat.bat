@echo off
setlocal EnableDelayedExpansion

:preinit
  echo [INFO]: Set `%%temp%%` directory to the user's local temp.
  set "temp=!LocalAppData!\Temp"
  echo [INFO]: Set working directory to the script location.
  pushd "%~dp0"

:check_rights
  echo [INFO]: Check for administrative privileges.
  net session >nul 2>&1
  if %errorlevel% equ 0 (
    echo [INFO]: Run with administrative privileges.
    goto :execute_script
  ) else (
    echo [WARNING]: Request administrative privileges.
    goto :elevate_rights
  )

:elevate_rights
  set batchFile=%~f0
  echo [INFO]: Current batch file path: `!batchFile!`.
  set "args="
  :collect_args
    if "%~1" equ "" (
      if "!args!" equ "" (
        set "args="
      ) else (
        set "args=!args:'="!"
      )
      echo [INFO]: Arguments passed to script: `!args!`.
      goto :trigger_uac
    )
    if "!args!" equ "" (
      set "args=%~1"
    ) else (
      set "args=!args! %~1"
    )
    shift
    goto :collect_args

:trigger_uac
  echo [INFO]: Check if PowerShell is available.
  where powershell >nul 2>&1
  if %errorlevel% equ 0 (
    echo [INFO]: PowerShell found. Execute command to elevate the privileges.
    if "!args!" equ "" (
      set "pwshCommand=Start-Process -FilePath '!batchFile!' -Verb RunAs"
    ) else (
      set "pwshCommand=Start-Process -FilePath '!batchFile!' -ArgumentList '!args!' -Verb RunAs"
      )
    echo [INFO]: PowerShell command: `!pwshCommand!`.
    powershell -NoProfile -ExecutionPolicy Bypass -Command "!pwshCommand!"
  ) else (
    echo [WARNING]: PowerShell not found. Use VBScript fallback.
    echo [INFO]: Escape double quotes in arguments for VBScript.
    set "vbsArgs="
    for %%A in (!args!) do (
      set "arg=%%~A"
      if "!vbsArgs!" neq "" (
        set "vbsArgs=!vbsArgs! !arg:"=""!"
       ) else (
        set "vbsArgs=!arg:"=""!"
       )
    )
    echo [INFO]: Arguments passed to VBScript: `!vbsArgs!`.
    set "vbsCommand=UAC.ShellExecute "cmd.exe", "/c ""!batchFile! !vbsArgs!""", "", "runas", 1"
    echo [INFO]: VBScript command: `!vbsCommand!`.
    echo [INFO]: Create VBScript to acquire administrator rights.
    set "vbsFile=%temp%\getAdmin.vbs"
    (
      echo Set UAC = CreateObject^("Shell.Application"^)
      echo !vbsCommand!
    ) > "!vbsFile!"
    echo [INFO]: Execute VBScript.
    cscript //nologo "!vbsFile!"
    echo [INFO]: Clean up VBScript data.
    del "!vbsFile!"
  )
  goto :end_script

:execute_script
:restart_winnat
  echo [INFO]: Restart WinNAT service.
  net stop winnat >nul 2>&1
  if errorlevel 1 echo [ERROR]: Failed to stop The Windows NAT Driver service (winnat).
  if errorlevel 0 echo [INFO]: The Windows NAT Driver service (winnat) was stopped successfully.
  net start winnat >nul 2>&1
  if errorlevel 1 echo [ERROR]: Failed to start The Windows NAT Driver service (winnat).
  if errorlevel 0 echo [INFO]: The Windows NAT Driver service (winnat) was started successfully.

:end_script
  popd
  endlocal
  echo [INFO]: Done.
  echo.
  pause
  exit /b
