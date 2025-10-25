@echo off

echo.
cd /d %~dp0

echo.
set /p path="Enter the path to VSCLayout folder (e.g. C: or C:\Soft): "

echo.
cd /d %path%\VSCLayout

echo.
start /wait vs_Community.exe ^
--addProductLang en-US ^
--allWorkloads ^
--includeRecommended ^
--installWhileDownloading ^
--locale en-US ^
--nocache ^
--passive ^
--norestart ^
--wait

echo.
echo ErrorLevel = %ErrorLevel%

echo.
pause



REM --------------------------------------------------------------------

REM Possible commands:

REM (blank)
REM modify
REM update
REM updateAll
REM repair
REM uninstall
REM export
REM modifySettings
REM rollback

REM --------------------------------------------------------------------

REM Possible parameters:

REM --installPath "C:\VSC" ^
REM --add Microsoft.VisualStudio.Workload.CoreEditor ^
REM --add Microsoft.VisualStudio.Workload.Azure ^
REM --add Microsoft.VisualStudio.Workload.Data ^
REM --add Microsoft.VisualStudio.Workload.DataScience ^
REM --add Microsoft.VisualStudio.Workload.ManagedDesktop ^
REM --add Microsoft.VisualStudio.Workload.ManagedGame ^
REM --add Microsoft.VisualStudio.Workload.NativeCrossPlat ^
REM --add Microsoft.VisualStudio.Workload.NativeDesktop ^
REM --add Microsoft.VisualStudio.Workload.NativeGame ^
REM --add Microsoft.VisualStudio.Workload.NativeMobile ^
REM --add Microsoft.VisualStudio.Workload.NetCrossPlat ^
REM --add Microsoft.VisualStudio.Workload.NetWeb ^
REM --add Microsoft.VisualStudio.Workload.Node ^
REM --add Microsoft.VisualStudio.Workload.Office ^
REM --add Microsoft.VisualStudio.Workload.Python ^
REM --add Microsoft.VisualStudio.Workload.Universal ^
REM --add Microsoft.VisualStudio.Workload.VisualStudioExtension ^
REM --remove Microsoft.VisualStudio.Workload.CoreEditor ^
REM --remove Microsoft.VisualStudio.Workload.Azure ^
REM --remove Microsoft.VisualStudio.Workload.Data ^
REM --remove Microsoft.VisualStudio.Workload.DataScience ^
REM --remove Microsoft.VisualStudio.Workload.ManagedDesktop ^
REM --remove Microsoft.VisualStudio.Workload.ManagedGame ^
REM --remove Microsoft.VisualStudio.Workload.NativeCrossPlat ^
REM --remove Microsoft.VisualStudio.Workload.NativeDesktop ^
REM --remove Microsoft.VisualStudio.Workload.NativeGame ^
REM --remove Microsoft.VisualStudio.Workload.NativeMobile ^
REM --remove Microsoft.VisualStudio.Workload.NetCrossPlat ^
REM --remove Microsoft.VisualStudio.Workload.NetWeb ^
REM --remove Microsoft.VisualStudio.Workload.Node ^
REM --remove Microsoft.VisualStudio.Workload.Office ^
REM --remove Microsoft.VisualStudio.Workload.Python ^
REM --remove Microsoft.VisualStudio.Workload.Universal ^
REM --remove Microsoft.VisualStudio.Workload.VisualStudioExtension ^
REM --addProductLang en-US ^
REM --removeProductLang en-US ^
REM --in <path> ^
REM --all ^
REM --allWorkloads ^
REM --includeRecommended ^
REM --includeOptional ^
REM --quiet ^
REM --passive ^
REM --norestart ^
REM --force ^
REM --installWhileDownloading ^
REM --downloadThenInstall ^
REM --channelUri <uri> ^
REM --channelId <id> ^
REM --productId <id> ^
REM --nickname VSC ^
REM --productKey <key> ^
REM --removeOos true ^
REM --config <path to *.vsconfig> ^
REM --help --? -h -? ^

REM --------------------------------------------------------------------

REM Possible layout commands & parameters:

REM --layout %path%\VSCLayout ^
REM --lang en-US ^
REM --add Microsoft.VisualStudio.Workload.CoreEditor ^
REM --add Microsoft.VisualStudio.Workload.Azure ^
REM --add Microsoft.VisualStudio.Workload.Data ^
REM --add Microsoft.VisualStudio.Workload.DataScience ^
REM --add Microsoft.VisualStudio.Workload.ManagedDesktop ^
REM --add Microsoft.VisualStudio.Workload.ManagedGame ^
REM --add Microsoft.VisualStudio.Workload.NativeCrossPlat ^
REM --add Microsoft.VisualStudio.Workload.NativeDesktop ^
REM --add Microsoft.VisualStudio.Workload.NativeGame ^
REM --add Microsoft.VisualStudio.Workload.NativeMobile ^
REM --add Microsoft.VisualStudio.Workload.NetCrossPlat ^
REM --add Microsoft.VisualStudio.Workload.NetWeb ^
REM --add Microsoft.VisualStudio.Workload.Node ^
REM --add Microsoft.VisualStudio.Workload.Office ^
REM --add Microsoft.VisualStudio.Workload.Python ^
REM --add Microsoft.VisualStudio.Workload.Universal ^
REM --add Microsoft.VisualStudio.Workload.VisualStudioExtension ^
REM --includeRecommended ^
REM --includeOptional ^
REM --wait ^
REM --useLatestInstaller ^
REM --config <path to *.vsconfig> ^
REM --noWeb ^
REM --verify ^
REM --fix ^
REM --clean <path to catalogs> ^

REM --------------------------------------------------------------------

REM Possible advanced layout parameters:

REM --channelId <id> ^
REM --channelUri <uri> ^
REM --installChannelUri <uri> ^
REM --installCatalogUri <uri> ^
REM --productId <id> ^
REM --arch all ^
REM --keepLayoutVersion ^
REM --locale en-US ^
REM --cache ^
REM --nocache ^
REM --noUpdateInstaller ^
REM --path <name>=<path> ^
REM --path cache="C:\VSC\cache" ^
REM --path shared="C:\VSC\shared" ^
REM --path install="C:\VSC" ^

REM --------------------------------------------------------------------

REM Possible modifySettings parameters:

REM --installPath "C:\VSC" ^
REM --newChannelUri <uri> ^
REM --channelUri <uri> ^
REM --productId <id> ^
REM --quiet ^
REM --removeOos true ^

REM --------------------------------------------------------------------

REM Possible rollback parameters:

REM --installPath "C:\VSC" ^

REM --------------------------------------------------------------------
