document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.toggle-button');
    const body = document.body;
    let isAnimating = false; /* Флаг для блокировки анимации */
    let animationId = 0; /* Уникальный ID для анимации */

    /* Загружаем сохраненную тему при загрузке страницы */
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        console.log('Загружена сохраненная тема: тёмная');
    } else {
        console.log('Загружена сохраненная тема: светлая');
    }

    /* Отслеживание изменений DOM */
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && mutation.target === body) {
                console.log('Обнаружено изменение класса body:', body.classList.contains('dark') ? 'тёмная' : 'светлая');
            }
        });
    });
    observer.observe(body, { attributes: true });

    /* Проверяем, что кнопка найдена */
    if (!button) {
        console.error('Кнопка .toggle-button не найдена!');
        return;
    }

    button.addEventListener('click', (e) => {
        if (isAnimating) {
            console.log('Клик игнорируется: анимация выполняется');
            return;
        }

        isAnimating = true;
        button.disabled = true;
        const currentAnimationId = ++animationId; /* Уникальный ID анимации */
        console.log('Клик по кнопке, начало анимации, ID:', currentAnimationId);

        /* Получаем координаты центра кнопки */
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        /* Определяем цвет круга */
        const isDark = body.classList.contains('dark');
        const circleColor = isDark ? '#f0f0f0' : '#222';
        console.log('Текущая тема:', isDark ? 'тёмная' : 'светлая', 'Цвет круга:', circleColor);

        /* Создаём круг */
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.backgroundColor = circleColor;
        circle.style.left = `${x - 50}px`;
        circle.style.top = `${y - 50}px`;
        body.appendChild(circle);

        /* Запускаем анимацию */
        circle.classList.add('expand');
        console.log('Круг расширяется, ID:', currentAnimationId);

        /* Переключаем тему после анимации */
        circle.addEventListener('animationend', () => {
            if (isAnimating && animationId === currentAnimationId) {
                body.classList.toggle('dark');
                circle.remove();
                isAnimating = false;
                button.disabled = false;
                const newTheme = body.classList.contains('dark') ? 'dark' : 'light';
                console.log('Тема переключена:', newTheme, 'ID:', currentAnimationId);

                // Сохраняем новую тему в localStorage
                localStorage.setItem('theme', newTheme);
                console.log('Тема сохранена в localStorage:', newTheme);
            } else {
                console.log('animationend проигнорирован: ID не совпадает или анимация завершена, ID:', currentAnimationId);
                circle.remove();
            }
        }, { once: true });
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Удаляем активный класс у всех кнопок
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Добавляем активный класс текущей кнопке
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});