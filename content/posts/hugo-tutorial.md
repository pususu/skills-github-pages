---
title: "Hugo博客搭建教程"
date: 2024-01-20T14:30:00Z
categories: ["教程", "Hugo"]
tags: ["Hugo", "静态网站", "教程"]
draft: false
---

# Hugo博客搭建教程

Hugo是一个强大的静态站点生成器，用Go语言编写，构建速度极快。本教程将教你如何从零开始搭建一个Hugo博客。

## 什么是Hugo？

Hugo是由Steve Francia创建的静态网站生成器，具有以下特点：

- ⚡ **构建速度快**: 毫秒级构建
- 🎨 **主题丰富**: 官方和社区提供大量主题
- 📱 **响应式**: 自动生成移动端友好页面
- 🔧 **配置简单**: YAML配置文件
- 🚀 **部署简单**: 生成静态文件，可部署到任何主机

## 安装Hugo

### macOS安装

```bash
# 使用Homebrew安装
brew install hugo

# 验证安装
hugo version
```

### Windows安装

```powershell
# 使用Chocolatey安装
choco install hugo

# 或者使用Scoop安装
scoop install hugo
```

### Linux安装

```bash
# Ubuntu/Debian
sudo apt-get install hugo

# CentOS/RHEL
sudo yum install hugo
```

## 创建新站点

```bash
# 创建新站点
hugo new site my-blog

# 进入站点目录
cd my-blog
```

## 安装主题

Hugo支持多种主题安装方式：

### 1. Git子模块方式

```bash
# 初始化Git仓库
git init

# 添加主题作为子模块
git submodule add https://github.com/theme-author/theme-name.git themes/theme-name
```

### 2. 直接下载

```bash
# 下载主题到themes目录
cd themes
git clone https://github.com/theme-author/theme-name.git
```

## 配置文件

Hugo支持多种配置文件格式：

### config.yaml (推荐)

```yaml
baseURL: 'https://yourdomain.com'
languageCode: 'zh-cn'
title: 'My Blog'
theme: 'theme-name'

params:
  author: 'Your Name'
  description: 'Blog description'
  
menu:
  main:
    - name: 'Home'
      url: '/'
      weight: 10
    - name: 'Posts'
      url: '/posts/'
      weight: 20
```

## 创建内容

### 创建文章

```bash
# 创建新文章
hugo new posts/my-first-post.md

# 创建页面
hugo new about.md
```

### 文章模板

```markdown
---
title: "文章标题"
date: 2024-01-20T14:30:00Z
categories: ["技术"]
tags: ["编程", "教程"]
draft: false
---

# 文章内容

这里写文章内容...
```

## 本地开发

```bash
# 启动开发服务器
hugo server -D

# 带草稿的预览
hugo server -D --bind 0.0.0.0 --port 1313

# 构建生产版本
hugo
```

## 自定义主题

### 目录结构

```
themes/
└── custom-theme/
    ├── layouts/
    │   ├── _default/
    │   │   ├── baseof.html
    │   │   ├── single.html
    │   │   └── list.html
    │   └── index.html
    ├── static/
    │   ├── css/
    │   └── js/
    └── theme.toml
```

### 自定义CSS

```css
/* themes/custom-theme/static/css/style.css */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}
```

## 部署博客

### 部署到GitHub Pages

1. 创建GitHub仓库
2. 构建静态文件：`hugo`
3. 将`public`目录推送到GitHub
4. 在仓库设置中启用GitHub Pages

### 使用GitHub Actions

创建`.github/workflows/deploy.yml`:

```yaml
name: Deploy Hugo Site
on:
  push:
    branches: [ main ]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with:
        submodules: true
    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v2
      with:
        hugo-version: 'latest'
    - name: Build
      run: hugo
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
```

## 高级功能

### 代码高亮

```yaml
# config.yaml
markup:
  highlight:
    style: 'github-dark'
    lineNos: true
    lineNumbersInTable: true
```

### 短代码

创建`layouts/shortcodes/youtube.html`:

```html
<div class="embed-responsive">
    <iframe src="https://www.youtube.com/embed/{{ .Get "id" }}" 
            frameborder="0" 
            allowfullscreen>
    </iframe>
</div>
```

使用方式：`{{< youtube id="VIDEO_ID" >}}`

### 分类和标签

```markdown
---
title: "文章标题"
categories: ["技术", "编程"]
tags: ["JavaScript", "前端开发"]
---
```

## 性能优化

### 图片优化

```markdown
{{< figure src="/images/photo.jpg" 
           alt="图片描述" 
           caption="图片标题" 
           width="800" >}}
```

### 资源管道

```html
{{ $css := resources.Get "css/style.css" | minify | fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
```

## 总结

Hugo是一个非常优秀的静态站点生成器，特别适合搭建技术博客。通过本教程，你应该能够：

- 安装和配置Hugo
- 创建和管理内容
- 自定义主题样式
- 部署到生产环境

开始你的Hugo博客之旅吧！

---

**相关链接**:
- [Hugo官方文档](https://gohugo.io/documentation/)
- [Hugo主题市场](https://themes.gohugo.io/)
- [Hugo社区](https://discourse.gohugo.io/)