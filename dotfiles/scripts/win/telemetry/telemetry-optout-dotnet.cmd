@echo off

cd /d %~dp0

echo.
set DOTNET_CLI_TELEMETRY_OPTOUT=1

echo.
setx DOTNET_CLI_TELEMETRY_OPTOUT 1

echo.
pause
