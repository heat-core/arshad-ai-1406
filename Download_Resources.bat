@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Download Arshad AI 1406 Resources
python download_all_1406_resources.py
pause
