@echo off
chcp 65001 >nul
echo ========================================
echo    GitHub Pages 快速部署脚本
echo ========================================
echo.

echo 正在检查 Git 是否已安装...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Git，请先安装 Git
    echo 下载地址: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [成功] Git 已安装
echo.

echo 正在初始化 Git 仓库...
if exist .git (
    echo [提示] Git 仓库已存在
) else (
    git init
    echo [成功] Git 仓库初始化完成
)
echo.

echo 正在添加文件...
git add .
echo [成功] 文件已添加到暂存区
echo.

echo ========================================
echo 下一步操作：
echo ========================================
echo.
echo 1. 在 GitHub 上创建一个新仓库
echo    访问: https://github.com/new
echo.
echo 2. 创建仓库后，复制仓库地址（例如：）
echo    https://github.com/你的用户名/仓库名.git
echo.
echo 3. 然后运行以下命令（将地址替换为你的实际地址）：
echo    git commit -m "初始提交：毕业创作作品集"
echo    git branch -M main
echo    git remote add origin https://github.com/你的用户名/仓库名.git
echo    git push -u origin main
echo.
echo 4. 在 GitHub 仓库设置中启用 Pages：
echo    Settings ^> Pages ^> Source: main branch ^> Save
echo.
echo 详细步骤请查看"部署指南.md"文件
echo.
echo ========================================
pause

