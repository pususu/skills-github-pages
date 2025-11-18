// 目录高亮和滚动跟踪
document.addEventListener('DOMContentLoaded', function() {
    // 获取目录元素
    const toc = document.getElementById('toc');
    if (!toc) return;

    // 获取所有标题
    const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6');
    if (headings.length === 0) return;

    // 为标题添加ID（如果没有的话）
    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
    });

    // 获取所有目录链接
    const tocLinks = toc.querySelectorAll('a');

    // 滚动事件监听
    function updateActiveTocItem() {
        let currentHeading = null;

        // 找到当前最接近顶部的标题
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) { // 100px offset
                currentHeading = heading;
            }
        });

        // 移除所有活动状态
        tocLinks.forEach(link => {
            link.classList.remove('active');
            link.style.color = 'var(--text-secondary)';
        });

        // 添加当前标题的活动状态
        if (currentHeading) {
            const activeLink = toc.querySelector(`a[href="#${currentHeading.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.style.color = 'var(--accent-primary)';
                activeLink.style.backgroundColor = 'var(--hover-bg)';
            }
        }
    }

    // 监听滚动事件
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(updateActiveTocItem, 100);
    });

    // 平滑滚动到标题
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 初始化
    updateActiveTocItem();
});

// 文件树交互功能
document.addEventListener('DOMContentLoaded', function() {
    const fileTree = document.querySelector('.file-tree');
    if (!fileTree) return;

    // 展开年份分组
    const yearGroups = fileTree.querySelectorAll('.year-group');
    yearGroups.forEach(group => {
        const year = group.querySelector('.year');
        const nestedList = group.querySelector('ul');

        if (year && nestedList) {
            year.style.cursor = 'pointer';
            year.addEventListener('click', function() {
                nestedList.style.display = nestedList.style.display === 'none' ? 'block' : 'none';
                year.textContent = year.textContent + (nestedList.style.display === 'none' ? ' ▼' : ' ▲');
            });
        }
    });
});

// 响应式侧边栏切换
document.addEventListener('DOMContentLoaded', function() {
    const layout = document.querySelector('.three-column-layout');
    if (!layout) return;

    // 检查是否为移动设备
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // 切换侧边栏显示
    function toggleSidebar(side) {
        const sidebar = document.querySelector(`.sidebar-${side}`);
        if (!sidebar) return;

        if (isMobile()) {
            sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
        }
    }

    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        if (isMobile()) {
            // 移动设备上默认隐藏侧边栏
            document.querySelector('.sidebar-left')?.setAttribute('style', 'display: none;');
            document.querySelector('.sidebar-right')?.setAttribute('style', 'display: none;');
        } else {
            // 桌面设备上显示所有侧边栏
            document.querySelector('.sidebar-left')?.removeAttribute('style');
            document.querySelector('.sidebar-right')?.removeAttribute('style');
        }
    });

    // 初始化
    if (isMobile()) {
        document.querySelector('.sidebar-left')?.setAttribute('style', 'display: none;');
        document.querySelector('.sidebar-right')?.setAttribute('style', 'display: none;');
    }
});
