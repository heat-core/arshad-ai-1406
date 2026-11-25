@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Arshad AI 1406 Dashboard Server (Port 8086)
python start_dashboard_server.py
pause
