document.addEventListener('DOMContentLoaded', () => {
    const commentsContainer = document.getElementById('comments__list');
    const preloader = document.getElementById('preloader');
    const apiUrl = 'https://jsonplaceholder.typicode.com/comments';
    let isEvenRequest = true;

    // library used for pretty scrolling of comments
    AOS.init({
        duration: 200, // duration of animation in milliseconds
        easing: 'ease-in-out', // type of animation
        once: true, // the animation will be executed once
    });

    function loadComments() {
        preloader.style.display = 'block';
        commentsContainer.innerHTML = '';

        const filterCondition = isEvenRequest ? (id) => id < 30 : (id) => 30 <= id < 60;
        isEvenRequest = !isEvenRequest;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
                return response.json();
            })
            .then((data) => {
                const filteredComments = data.filter((comment) => filterCondition(comment.id));
                if (filteredComments.length === 0) {
                    const commentElement = document.createElement('div');
                    commentElement.innerHTML = `
                        <p>Пока нет комментариев</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                }

                filteredComments.forEach((comment) => {
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';
                    commentElement.innerHTML = `
                        <div data-aos="fade-up">
                            <p class="comment__author">${comment.name} (${comment.email}):</p>
                            <p class="comment__text">${comment.body}</p>
                        </div>
                    `;  // fade-up is animation type for this object
                    commentsContainer.appendChild(commentElement);
                });
            })
            .catch((error) => {
                commentsContainer.innerHTML = `<div class="error-message">⚠ Что-то пошло не так: ${error.message}</div>`;
            })
            .finally(() => {
                preloader.style.display = 'none';
            });
    }

    loadComments();
});
