@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul || (echo Instale Node.js 20 LTS ou superior em https://nodejs.org/ & pause & exit /b 1)
if not exist "apps\mobile\.env" copy "apps\mobile\.env.example" "apps\mobile\.env" >nul
if not exist "node_modules" (call npm install || (echo Falha ao instalar dependencias. & pause & exit /b 1))
echo Iniciando Expo. Para login real, preencha apps\mobile\.env com Firebase e OAuth Google.
call npm run dev:mobile
pause
