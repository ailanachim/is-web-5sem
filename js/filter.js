function getInterval(filter) {
    let min = 0;
    let max = 1e9;
    if (filter.value !== 'Все') {
        min = parseInt(filter.value, 10);
        const selectedIndex = filter.options.selectedIndex;
        if (selectedIndex < filter.options.length - 1) {
            max = parseInt(filter.options.item(selectedIndex + 1).value, 10);
        }
    }
    return [min, max];
}

function matches(value, interval) {
    return value >= interval[0] && value < interval[1];
}

function filterGames() {
    const gameCards = document.querySelectorAll('.game-card');
    const ageFilter = document.getElementById('age-filter');
    const ageInterval = getInterval(ageFilter);

    const playersFilter = document.getElementById('players-filter');
    const playersInterval = getInterval(playersFilter);

    const timeFilter = document.getElementById('time-filter');
    const timeInterval = getInterval(timeFilter);

    gameCards.forEach((card) => {
        const gameAge = parseInt(card.dataset.age, 10);
        const gamePlayers = card.dataset.players.split('-').map(Number)[0];
        const gameTimes = card.dataset.time.replace('+', '').split('-').map(time => parseInt(time));

        const gameTime = gameTimes.length === 2 ? (gameTimes[0] + gameTimes[1]) / 2 : gameTimes[0];

        if (matches(gameAge, ageInterval) && matches(gamePlayers, playersInterval) && matches(gameTime, timeInterval)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    const age = ageFilter.value;
    const numPlayers = playersFilter.value;
    const time = timeFilter.value;

    const settings = {age, numPlayers, time};
    localStorage.setItem('gameFilters', JSON.stringify(settings));
}


document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('games-filter');

    const savedSettings = JSON.parse(localStorage.getItem('gameFilters'));
    if (savedSettings) {
        filterForm['age-filter'].value = savedSettings.age;
        filterForm['players-filter'].value = savedSettings.numPlayers;
        filterForm['time-filter'].value = savedSettings.time;
    }
    filterGames();

    filterForm.addEventListener('change', () => {
        filterGames();
    });
});
