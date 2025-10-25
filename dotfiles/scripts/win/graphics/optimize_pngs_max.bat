@echo off
setlocal

REM Wrapper to call the PowerShell optimizer (allows drag-and-drop).
REM Place this optimize_pngs_max.bat and optimize_pngs_max.ps1 together.

if "%~1"=="" (
    echo Drag a folder onto this file to optimize PNGs inside it.
    pause
    exit /b
)

set SCRIPT_DIR=%~dp0
powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%optimize_pngs_max.ps1" %*

endlocal
pause
exit /b
