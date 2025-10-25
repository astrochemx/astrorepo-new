@echo off

cls

cd /d %~dp0

:init_admin
  setlocal DisableDelayedExpansion
  set cmdInvoke=1
  set winSysFolder=System32
  set "batchPath=%~dpnx0"
  for %%k in (%0) do set batchName=%%~nk
  set "vbsGetPrivileges=%temp%\OEgetPriv_%batchName%.vbs"
  setlocal EnableDelayedExpansion

:check_privileges
  NET FILE 1>NUL 2>NUL
  if "%errorlevel%" == "0" ( goto got_privileges ) else ( goto get_privileges )

:get_privileges
  if "%1"=="ELEV" (echo ELEV & shift /1 & goto got_privileges)

  echo.
  echo **************************************
  echo Invoking UAC for Privilege Escalation
  echo **************************************

  echo Set UAC = CreateObject^("Shell.Application"^) > "%vbsGetPrivileges%"
  echo args = "ELEV " >> "%vbsGetPrivileges%"
  echo For Each strArg in WScript.Arguments >> "%vbsGetPrivileges%"
  echo args = args ^& strArg ^& " "  >> "%vbsGetPrivileges%"
  echo Next >> "%vbsGetPrivileges%"

  if "%cmdInvoke%"=="1" goto invoke_cmd

  echo UAC.ShellExecute "!batchPath!", args, "", "runas", 1 >> "%vbsGetPrivileges%"
  goto exec_elevation

:invoke_cmd
  echo args = "/c """ + "!batchPath!" + """ " + args >> "%vbsGetPrivileges%"
  echo UAC.ShellExecute "%SystemRoot%\%winSysFolder%\cmd.exe", args, "", "runas", 1 >> "%vbsGetPrivileges%"

:exec_elevation
  "%SystemRoot%\%winSysFolder%\WScript.exe" "%vbsGetPrivileges%" %*
  exit /B

:got_privileges
 setlocal & cd /d %~dp0
 if "%1"=="ELEV" (del "%vbsGetPrivileges%" 1>nul 2>nul  &  shift /1)

:prepare
  cls

  cd /d %~dp0

  set hosts_file=%WINDIR%\System32\drivers\etc\hosts
  set hosts_backup=%WINDIR%\System32\drivers\etc\hosts.orig.bak

  if "%~1"=="" goto manual_params
  if not "%~1"=="" goto set_params

  goto end

:start
  echo.
  echo Making backup of hosts file

  if exist %hosts_backup% (
    echo.
    echo %hosts_backup% exists!
    echo Skip backupping
    echo.
    echo Checking entries
    goto check_entry_0
  ) else (
    echo.
    echo %hosts_backup% doesn't exist!
    echo Creating backup to %hosts_backup%
    goto backup_hosts
  )

:backup_hosts
  copy /V %hosts_file% %hosts_backup%
  goto check_entry_0

:check_entry_0
  find /i "%entry_0%" %hosts_file% >NUL
  if errorlevel 1 (
    echo.
    echo "%entry_0%" not found
    echo Adding entry
    goto add_entry_0
  ) else (
    echo.
    echo "%entry_0%" found
    echo Skip adding entry
    goto check_entry_127
  )

:check_entry_127
  find /i "%entry_127%" %hosts_file% >NUL
  if errorlevel 1 (
    echo.
    echo "%entry_127%" not found
    echo Adding entry
    goto add_entry_127
  ) else (
    echo.
    echo "%entry_127%" found
    echo Skip adding entry
    goto check_entry_192
  )

:check_entry_192
  find /i "%entry_192%" %hosts_file% >NUL
  if errorlevel 1 (
    echo.
    echo "%entry_192%" not found
    echo Adding entry
    echo.
    goto add_entry_192
  ) else (
    echo.
    echo "%entry_192%" found
    echo Skip adding entry
    echo.
    goto end
  )

:end
  pause

goto :eof

:set_params
  set entry_0=0.0.0.0 %1
  set entry_127=127.0.0.1 %1
  set entry_192=192.168.0.1 %1
  goto start

:manual_params
  echo.
  set /p host="Enter the domain name for resolution at localhost: "
  set entry_0=0.0.0.0 %host%
  set entry_127=127.0.0.1 %host%
  set entry_192=192.168.0.1 %host%
  goto start

:add_entry_0
  echo %entry_0% >> %hosts_file%
  goto check_entry_127

:add_entry_127
  echo %entry_127% >> %hosts_file%
  goto check_entry_192

:add_entry_192
  echo %entry_192% >> %hosts_file%
  goto end
