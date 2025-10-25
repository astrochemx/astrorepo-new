@echo off

cd /d %~dp0

echo.
set NEXT_TELEMETRY_DISABLED=1

echo.
setx NEXT_TELEMETRY_DISABLED 1

echo.
call npx next@latest telemetry disable

echo.
pause
