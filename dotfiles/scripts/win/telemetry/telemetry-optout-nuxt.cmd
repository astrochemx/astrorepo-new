@echo off

cd /d %~dp0

echo.
set NUXT_TELEMETRY_DISABLED=1

echo.
setx NUXT_TELEMETRY_DISABLED 1

echo.
call npx nuxt@latest telemetry disable --global

echo.
call npx @nuxt/telemetry@latest disable --global

echo.
pause
