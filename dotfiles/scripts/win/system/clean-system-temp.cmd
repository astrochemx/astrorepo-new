@echo off

setlocal EnableDelayedExpansion

cd /d %~dp0

REM https://stackoverflow.com/questions/69068/split-long-commands-in-multiple-lines-through-windows-batch-file
REM https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/for
REM https://ss64.com/nt/for.html
REM https://ss64.com/nt/syntax-esc.html
REM https://ss64.com/nt/syntax-brackets.html
REM https://www.robvanderwoude.com/escapechars.php

set folders=( ^
^"%SystemDrive%\Users\%username%\AppData\Local\Temp\*^" ^
^"%SystemDrive%\Users\%username%\AppData\Roaming\Temp\*^" ^
^"%SystemDrive%\Users\%username%\AppData\Temp\*^" ^
^"%SystemDrive%\Users\%username%\Temp\*^" ^
^"%SystemDrive%\Users\Temp\*^" ^
^"%SystemDrive%\Windows\Temp\*^" ^
^"%SystemDrive%\Temp\*^" ^
^"%SystemDrive%\Users\%username%\AppData\Local\Tmp\*^" ^
^"%SystemDrive%\Users\%username%\AppData\Roaming\Tmp\*^" ^
^"%SystemDrive%\Users\%username%\AppData\Tmp\*^" ^
^"%SystemDrive%\Users\%username%\Tmp\*^" ^
^"%SystemDrive%\Users\Tmp\*^" ^
^"%SystemDrive%\Windows\Tmp\*^" ^
^"%SystemDrive%\Tmp\*^" ^
)

echo.
echo Clearing Temporary Files...

echo.
for %%f in %folders% do del /f /s /q "%%f"

echo.
for /d %%d in %folders% do rd "%%d" /s /q

echo.
echo Done^^!

endlocal

echo.
pause
