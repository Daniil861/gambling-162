
import { addMoney, getRandom, deleteMoney, getRandomNumArr } from '../files/functions.js';
import { startData } from './startData.js';

export function initStartData() {

	if (sessionStorage.getItem('money')) {
		writeScore();
	} else {
		sessionStorage.setItem('money', startData.bank);
		writeScore();
	}

	if (!sessionStorage.getItem('current-bet')) {
		sessionStorage.setItem('current-bet', startData.countBet);
		if (document.querySelector('.bet-box__bet')) document.querySelector('.bet-box__bet').textContent = sessionStorage.getItem('current-bet');
	} else {
		if (document.querySelector('.bet-box__bet')) document.querySelector('.bet-box__bet').textContent = sessionStorage.getItem('current-bet');
	}

}

function writeScore() {
	if (document.querySelector('.score')) {
		document.querySelectorAll('.score').forEach(el => {
			el.textContent = sessionStorage.getItem('money');
		})
	}
}

initStartData();


//========================================================================================================================================================
// Функция присвоения случайного класса анимациии money icon
const anim_items = document.querySelectorAll('.icon-anim');

function getRandomAnimate() {
	let number = getRandom(0, 3);
	let arr = ['jump', 'scale', 'rotate'];
	let random_item = getRandom(0, anim_items.length);
	anim_items.forEach(el => {
		if (el.classList.contains('_anim-icon-jump')) {
			el.classList.remove('_anim-icon-jump');
		} else if (el.classList.contains('_anim-icon-scale')) {
			el.classList.remove('_anim-icon-scale');
		} else if (el.classList.contains('_anim-icon-rotate')) {
			el.classList.remove('_anim-icon-rotate');
		}
	})
	setTimeout(() => {
		anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
	}, 100);
}

if (anim_items.length) {
	setInterval(() => {
		getRandomAnimate();
	}, 20000);
}

//========================================================================================================================================================

if (document.querySelector('.main')) {
	document.querySelector('.main').classList.add('_active');

}



//========================================================================================================================================================
// game

export const configGame = {
	state: 1, // 1 - not playing, 2 - playing
	countBombs: 10,

	countBombs: 10,
	constGoodBlocks: 30,
	currentGoodBlocks: 30,

	currentCoeff: 0,
	stepUpCoeff: 0.4,

	bet: 8
}

const footer = document.querySelector('.footer');

export function startGame() {
	holdActions();

	deleteMoney(configGame.bet, '.score', 'money');

	configGame.state = 2;
}

function holdActions() {
	footer.classList.add('_hold');
}

function removeHoldActions() {
	footer.classList.remove('_hold');
}


//==
// Генерируем случайные числа
function generateIndexesBombs() {
	let randomArr = getRandomNumArr(0, 39, configGame.countBombs);
	let arr = randomArr();
	return arr;
}

export function markItemsBombs() {
	const bombs = generateIndexesBombs();

	const items = document.querySelectorAll('[data-bomb]');

	for (let i = 0; i < bombs.length; i++) {
		items[bombs[i]].setAttribute('data-bomb', true);
	}

}

export function resetMarkedItems() {
	const items = document.querySelectorAll('[data-bomb]');
	items.forEach(item => item.setAttribute('data-bomb', false));
}
//==

function openItem(block, res) {
	if (res == 'true') {
		block.classList.add('_lose');
	} else if (res == 'false') {
		block.classList.add('_win');
	}
}

export function checkCollision(block) {

	configGame.currentGoodBlocks--;

	const res = block.getAttribute('data-bomb');

	openItem(block, res);

	if (res == 'false') {
		upCurrentCoeff();
	} else if (res == 'true') {
		showFinalScreen();
	}

	if (configGame.currentGoodBlocks <= 0) {
		showFinalScreen();
	}
}

function upCurrentCoeff() {
	configGame.currentCoeff += configGame.stepUpCoeff;
}

function closeItems() {
	const items = document.querySelectorAll('[data-bomb]');
	items.forEach(item => {
		item.setAttribute('data-bomb', 'false');
		if (item.classList.contains('_win')) item.classList.remove('_win');
		if (item.classList.contains('_lose')) item.classList.remove('_lose');

	});
}

export function resetGame() {
	closeItems();
	removeHoldActions();

	configGame.state = 1;

	configGame.currentGoodBlocks = configGame.constGoodBlocks;
	configGame.currentCoeff = 0;

	markItemsBombs();
}



//========================================================================================================================================================
export function showFinalScreen() {
	const final = document.querySelector('.final');
	const finalCheck = document.querySelector('.final-check');

	const winCount = Math.floor(configGame.bet * configGame.currentCoeff);

	finalCheck.textContent = `${winCount}`;
	addMoney(winCount, '.score', 1000, 2000);

	setTimeout(() => {
		final.classList.add('_visible');
	}, 250);
}
