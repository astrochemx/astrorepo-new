@echo off

cd /d %~dp0

echo.
set ASTRO_TELEMETRY_DISABLED=1

echo.
setx ASTRO_TELEMETRY_DISABLED 1

echo.
call npx astro@latest telemetry disable

echo.
pause
