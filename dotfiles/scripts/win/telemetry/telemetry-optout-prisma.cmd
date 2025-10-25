@echo off

cd /d %~dp0

echo.
set CHECKPOINT_DISABLE=1

echo.
setx CHECKPOINT_DISABLE 1

echo.
pause
