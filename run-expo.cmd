@echo off
setlocal

set "NODE_EXE=%ProgramFiles%\nodejs\node.exe"
if not exist "%NODE_EXE%" (
  echo Node.js bulunamadi: "%NODE_EXE%"
  echo Once Node.js kurulumunu kontrol et.
  exit /b 1
)

if not exist "%~dp0node_modules\expo\bin\cli" (
  echo Gerekli paketler bulunamadi. Once "npm.cmd install" calistir.
  exit /b 1
)

"%NODE_EXE%" "%~dp0node_modules\expo\bin\cli" start
