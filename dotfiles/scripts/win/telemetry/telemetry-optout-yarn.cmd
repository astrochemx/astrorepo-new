@echo off

cd /d %~dp0

echo.
call yarn config set --home enableTelemetry 0

echo.
pause
