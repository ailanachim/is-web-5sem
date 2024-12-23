window.addEventListener('load', function () {
    const loadTime = performance.now();
    const statsContainer = document.getElementById('load-stats');
    if (statsContainer) {
        statsContainer.textContent = `Page loaded for ${loadTime.toFixed(2)} ms.`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementsByClassName("menu__link");
    const currentPage = document.location.pathname.split('/').pop();

    for (let i = 0; i < navLinks.length; i++) {
        console.log(currentPage);
        console.log(navLinks[i].getAttribute('href'));
        if (navLinks[i].getAttribute('href') === currentPage) {
            navLinks[i].classList.add('menu__link__active');
            break;
        }
    }

    const menuToggle = document.getElementById('menu__toggle');
    const menu = document.querySelector('.menu__list');

    menuToggle.addEventListener('click', () => {
        if (menu.style.display === "none") {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 600) {
            menu.style.display = "flex";
        } else {
            menu.style.display = "none";
        }
    })
});
