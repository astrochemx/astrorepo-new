@echo off

cd /d %~dp0

echo.
set STORYBOOK_DISABLE_TELEMETRY=1

echo.
setx STORYBOOK_DISABLE_TELEMETRY 1

echo.
pause
