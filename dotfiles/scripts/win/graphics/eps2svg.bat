@echo off
setlocal

if "%~1"=="" (
    echo Please drag and drop *.eps file onto this script.
    pause
    exit /b
)

if /i "%~x1"==".eps" (
    echo 'Converting "%~nx1""
    inkscape --export-plain-svg "%~f1" --export-filename "%~dpn1.svg"
) else (
    echo "Skipping (not '*.eps') "%~nx1""
)

echo Done!
pause
