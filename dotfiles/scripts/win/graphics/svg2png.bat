@echo off
setlocal

REM Wrapper to call the PowerShell converter (allows drag-and-drop).
REM Place this svg2png.bat and svg2png.ps1 together.

if "%~1"=="" (
    echo Drag a folder onto this file to convert SVGs inside it to PNGs.
    pause
    exit /b
)

set SCRIPT_DIR=%~dp0
powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%svg2png.ps1" %*

endlocal
pause
exit /b
