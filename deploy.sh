#!/bin/bash

# 蒲素博客部署脚本

set -e

echo "开始部署博客..."

# 检查 Hugo 是否已安装
if ! command -v hugo &> /dev/null; then
    echo "错误: Hugo 未安装，请先安装 Hugo"
    exit 1
fi

# 清理旧的构建文件
if [ -d "public" ]; then
    echo "清理旧的构建文件..."
    rm -rf public
fi

# 构建静态文件
echo "构建静态文件..."
hugo

# 检查构建是否成功
if [ ! -d "public" ]; then
    echo "错误: 构建失败"
    exit 1
fi

# 显示构建信息
echo "构建完成！"
echo "文件数量: $(find public -type f | wc -l)"
echo "总大小: $(du -sh public | cut -f1)"

# 根据参数选择部署方式
case "$1" in
    "github")
        echo "部署到 GitHub Pages..."
        cd public
        git init
        git add .
        git commit -m "Deploy blog - $(date '+%Y-%m-%d %H:%M:%S')"

        # 这里需要替换为你的实际 GitHub 仓库地址
        git remote add origin https://github.com/pusu404/pusu404.github.io.git
        git push -f origin master

        echo "已部署到 GitHub Pages!"
        cd ..
        ;;
    "preview")
        echo "启动预览服务器..."
        hugo server -D --bind 0.0.0.0 --port 1313
        ;;
    *)
        echo "使用方法:"
        echo "  $0 github    # 部署到 GitHub Pages"
        echo "  $0 preview   # 启动本地预览"
        echo ""
        echo "静态文件已生成在 ./public 目录"
        ;;
esac
