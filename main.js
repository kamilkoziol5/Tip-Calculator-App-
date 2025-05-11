const billInput = document.querySelector('#bill-input');
const btnTips = document.querySelectorAll('.btn-tip');
const btnCustom = document.querySelector('.btn-custom');
const personInput = document.querySelector('#person-input');
const btnReset = document.querySelector('.reset-btn');
const tipPerPersonDiv = document.querySelector('.amount-person');
const totalAmountPerPersonDiv = document.querySelector('.total-amount-person');

btnTips.forEach(btn => {
	btn.addEventListener('click', () => {
		btnTips.forEach(b => b.classList.remove('active'));
		btn.classList.add('active');
		btnCustom.value = '';
		calculateTip();
	});
});

[billInput, personInput].forEach(input => {
	input.addEventListener('input', () => {
		calculateTip();
	});
});

btnCustom.addEventListener('input', () => {
	btnTips.forEach(btn => btn.classList.remove('active'));
	calculateTip();
});

function calculateTip() {
	const bill = parseFloat(billInput.value);
	const people = parseFloat(personInput.value);
	let tipPercent = '';

	const activePercentBtn = document.querySelector('.btn-tip.active');

	if (activePercentBtn) {
		tipPercent = parseFloat(activePercentBtn.dataset.percent);
	} else if (btnCustom.value) {
		tipPercent = parseFloat(btnCustom.value);
	}

	if (!bill || !people || !tipPercent) {
		tipPerPersonDiv.textContent = '$0.00';
		totalAmountPerPersonDiv.textContent = '$0.00';
		return;
	}

	const tipTotal = (bill * tipPercent) / 100;
	const tipPerPerson = tipTotal / people;
	const totalAmountPerPerson = (bill + tipTotal) / people;

	tipPerPersonDiv.textContent = `$${tipPerPerson.toFixed(2)}`;
	totalAmountPerPersonDiv.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
}

btnReset.addEventListener('click', () => {
	personInput.value = '';
	billInput.value = '';
	tipPerPersonDiv.textContent = '$0.00';
	totalAmountPerPersonDiv.textContent = '$0.00';
	btnCustom.value = '';
	btnTips.forEach(btn => btn.classList.remove('active'));
});
