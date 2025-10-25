@echo off

cd /d %~dp0

echo.
wsl --list --verbose

echo.
wsl --shutdown

echo.
set /p path="Enter the path to the desired WSL location (e.g. C: or C:\wsl): "

echo.
mkdir %path%\backup
mkdir %path%\data
mkdir %path%\temp

echo.
wsl --export docker-desktop-data "%path%\backup\docker-desktop-data.tar"

echo.
wsl --unregister docker-desktop-data

echo.
wsl --import docker-desktop-data "%path%\data" "%path%\backup\docker-desktop-data.tar" --version 2

echo.
pause
