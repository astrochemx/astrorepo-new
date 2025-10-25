@echo off
setlocal enabledelayedexpansion

REM === Check if something was dropped on the bat file ===
if "%~1"=="" (
    echo Please drag and drop a file or folder onto this script.
    pause
    exit /b
)

echo "Arguments passed: %*"

REM === Loop over all dropped arguments (files/folders) ===
for %%A in (%*) do (
    if exist "%%~A/" (
        REM It's a folder → process all .eps inside
        for %%F in ("%%~A\*.eps") do (
            echo "Converting: %%~nxF"
            inkscape --export-plain-svg "%%~F" --export-filename "%%~dpnF.svg"
        )
    ) else (
        REM It's a single file
        if /i "%%~xA"==".eps" (
            echo "Converting: %%~nxA"
            inkscape --export-plain-svg "%%~A" --export-filename "%%~dpnA.svg"
        ) else (
            echo "Skipping (not .eps): %%~nxA"
        )
    )
)

echo Done!
pause
