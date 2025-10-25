@echo off

REM https://learn.microsoft.com/en-us/sysinternals/downloads/psshutdown

timeout /t 30

psshutdown -c -k -t 7200
