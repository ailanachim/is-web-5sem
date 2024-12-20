(function () {
    window.addEventListener('load', function () {
        const loadTime = performance.now();
        const statsContainer = document.getElementById('load-stats');
        if (statsContainer) {
            statsContainer.textContent = `Page loaded for ${loadTime.toFixed(2)} ms.`;
        }
    });

    const navLinks = document.getElementsByClassName("menu__link");
    const currentPage = document.location.pathname.split('/').pop();

    for (let i = 0; i < navLinks.length; i++) {
        if (navLinks[i].getAttribute('href') === currentPage) {
            navLinks[i].classList.add('menu__link__active');
            break;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.getElementById('menu__toggle');
        const menu = document.querySelector('.menu__list');

        menuToggle.addEventListener('click', () => {
            console.log('menuToggl clicked');
            console.log(menu.style.display);
            if (menu.style.display === "none") {
                menu.style.display = "flex";
            } else {
                menu.style.display = "none";
            }
        });
    });


})();
