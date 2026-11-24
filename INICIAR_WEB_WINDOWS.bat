@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo          Literator - Sistema Web
echo ============================================
where node >nul 2>nul || (echo ERRO: instale Node.js 20 LTS ou superior em https://nodejs.org/ & pause & exit /b 1)
for /f "tokens=1" %%v in ('node -p "process.versions.node.split('.')[0]"') do set NODE_MAJOR=%%v
if %NODE_MAJOR% LSS 20 (echo ERRO: Node.js 20 ou superior e necessario. & pause & exit /b 1)
if not exist "apps\web\.env" copy "apps\web\.env.example" "apps\web\.env" >nul
if not exist "node_modules" (
  echo Instalando dependencias. Na primeira vez pode demorar alguns minutos...
  call npm install
  if errorlevel 1 (echo Falha ao instalar dependencias. Confira sua internet e tente novamente. & pause & exit /b 1)
)
echo Abrindo o Literator em http://localhost:5173
echo Sem credenciais Firebase, o botao de entrada abre o MODO DEMONSTRACAO local.
call npm run dev:web
pause
