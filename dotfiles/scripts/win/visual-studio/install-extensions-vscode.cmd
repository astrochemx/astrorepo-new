@echo off

REM https://ss64.com/nt/delayedexpansion.html
setLocal enableDelayedExpansion

if "!logFile!" == "" (
  cd /d %~dp0
  set logFile="install-extensions-vscode.log"
  2>&1 call "%~f0" | powershell -C "$Input | Tee-Object -Append -FilePath !logFile!"
  pause
  exit /b
) else endlocal

cd /d %~dp0
for /F "useBackQ tokens=1,2 delims==" %%i in (`wmic os get LocalDateTime /value 2^>nul`) do if '.%%i.'=='.LocalDateTime.' set LDT=%%j
set localDateTimeNow=%LDT:~0,4%-%LDT:~4,2%-%LDT:~6,2% %LDT:~8,2%:%LDT:~10,2%:%LDT:~12,2%

echo.
echo ------------------------------------------------------------
echo.
echo [%localDateTimeNow%]
echo.

REM call code --install-extension <extension-unique-identifier|extension-path.vsix> ( --pre-release ) ( --force )
