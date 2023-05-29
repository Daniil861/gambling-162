
import { deleteMoney, noMoney, checkRemoveAddClass } from './functions.js';
import { startData } from './startData.js';
import { initStartData, configGame, startGame, markItemsBombs, checkCollision, resetGame } from './script.js';


// Объявляем слушатель событий "клик"
document.addEventListener('click', (e) => {
	initStartData();

	const targetElement = e.target;

	const wrapper = document.querySelector('.wrapper');

	if (targetElement.closest('.preloader__button')) {
		location.href = 'main.html';
	}

	if (targetElement.closest('[data-btn="game"]')) {

		markItemsBombs();

		setTimeout(() => {
			wrapper.classList.add('_game');
		}, 250);
	}

	if (targetElement.closest('[data-btn="game-home"]')) {
		wrapper.classList.remove('_game');
		resetGame();
	}

	//========================================================================================================================================================


	if (targetElement.closest('[data-screen="final"] .final__button')) {
		if (wrapper.classList.contains('_game')) wrapper.classList.remove('_game');
		if (document.querySelector('[data-screen="final"]').classList.contains('_visible')) {
			document.querySelector('[data-screen="final"]').classList.remove('_visible');
		}
	}

	//========================================================================================================================================================

	if (targetElement.closest('[data-bet]')) {
		configGame.bet = +targetElement.closest('[data-bet]').dataset.bet;
		document.querySelector('.footer__current-bet').textContent = configGame.bet;
	}

	if (targetElement.closest('.footer__button') && configGame.state === 1) {
		startGame();
	}

	if (targetElement.closest('[data-bomb]') && configGame.state === 2) {
		checkCollision(targetElement.closest('[data-bomb]'));
	}


	//========================================================================================================================================================


	if (targetElement.closest('.final__button') && document.querySelector('.final').classList.contains('_visible')) {
		document.querySelector('.final').classList.remove('_visible');
		resetGame();
		// if (wrapper.classList.contains('_game')) {
		// 	wrapper.classList.remove('_game');
		// }
	}
})



