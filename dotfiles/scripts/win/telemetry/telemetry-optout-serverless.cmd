@echo off

cd /d %~dp0

echo.
set SLS_TELEMETRY_DISABLED=1

echo.
setx SLS_TELEMETRY_DISABLED 1

echo.
pause
