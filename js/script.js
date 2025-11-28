// 💡 以下を script.js の最後に追加

document.addEventListener('DOMContentLoaded', function() {
    const targets = document.querySelectorAll('.fade-up');
    const menuCheckbox = document.getElementById('menu-btn-check');
    const navLinks = document.querySelectorAll('.main-nav a');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // セクション内の見出し→本文の順でふわっと出すため、DOM順に遅延を自動付与
    targets.forEach(group => {
        const items = group.querySelectorAll('.fade-up-item');
        items.forEach((item, index) => {
            const delay = 0.15 + index * 0.12; // 先頭は少し間を置き、以降順番に加算
            item.style.transitionDelay = `${delay}s`;
        });
    });

    // フェードアップ制御（IntersectionObserver対応ブラウザのみ実行）
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-show');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10%',
            threshold: 0.2
        });

        targets.forEach(target => observer.observe(target));
    } else {
        // 非対応 or reduce-motion 環境では即時表示
        targets.forEach(target => target.classList.add('is-show'));
    }

    // SPナビでリンクを押したらメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheckbox) {
                menuCheckbox.checked = false;
            }
        });
    });

    // 地図は iframe の loading=\"lazy\" に任せる（確実に表示させるため即時 src 設定）
});
