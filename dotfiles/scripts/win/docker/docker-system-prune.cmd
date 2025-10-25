@echo off

cd /d %~dp0

echo.
echo Clearing Docker System...

echo.
call docker compose stop --timeout 10
echo.
call docker compose rm --stop --volumes --force
echo.
call docker compose down --remove-orphans --volumes --rmi "all" --timeout 10

echo.
call docker builder prune --all --force
echo.
call docker buildx prune --all --force
echo.
call docker container prune --force
echo.
call docker image prune --all --force
echo.
call docker network prune --force
echo.
call docker volume prune --all --force
echo.
call docker system prune --all --volumes --force

echo.
pause
