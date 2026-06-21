@echo off
REM Start MySQL service on Windows
echo.
echo ============================================
echo Starting MySQL Service...
echo ============================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script must be run as Administrator
    echo.
    echo Please:
    echo 1. Right-click this .bat file
    echo 2. Select "Run as administrator"
    pause
    exit /b 1
)

REM Try MySQL80 first
echo Attempting to start MySQL80...
net start MySQL80
if %errorLevel% equ 0 (
    echo.
    echo ✓ MySQL80 started successfully!
    timeout /t 3
    exit /b 0
)

REM Try MySQL57
echo Attempting to start MySQL57...
net start MySQL57
if %errorLevel% equ 0 (
    echo.
    echo ✓ MySQL57 started successfully!
    timeout /t 3
    exit /b 0
)

REM If both failed
echo.
echo ✗ Could not start MySQL service
echo.
echo Options:
echo 1. Install MySQL from: https://dev.mysql.com/downloads/mysql/
echo 2. Or use XAMPP/WAMP for an easier setup
echo 3. Check if MySQL is installed by running: mysql --version
echo.
pause
exit /b 1
