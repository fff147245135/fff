// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// 点击导航链接后关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 图片模态框功能
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentImages = [];
let currentIndex = 0;

// 获取所有图片元素
function getAllImages() {
    const images = [];
    document.querySelectorAll('.gallery-item img').forEach(img => {
        images.push({
            src: img.src,
            alt: img.alt
        });
    });
    return images;
}

// 打开模态框
function openModal(index) {
    currentImages = getAllImages();
    currentIndex = index;
    updateModalImage();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 更新模态框中的图片
function updateModalImage() {
    if (currentImages.length > 0) {
        modalImg.src = currentImages[currentIndex].src;
        modalCaption.textContent = currentImages[currentIndex].alt;
    }
}

// 关闭模态框
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// 上一张图片
function showPrevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateModalImage();
}

// 下一张图片
function showNextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateModalImage();
}

// 为所有图片添加点击事件
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        openModal(index);
    });
});

// 关闭按钮事件
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// 点击模态框背景关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// 键盘导航
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});

// 上一张/下一张按钮事件
if (modalPrev) {
    modalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
}

if (modalNext) {
    modalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// 图片懒加载优化
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 添加加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

