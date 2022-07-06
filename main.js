const ws = ' ';

const op = {
	'add': '+',
	'sub': '-',
	'mul': '*',
	'div': '/'
};

function tok(serial) {
	let cont = [];
	let i = 0;
	while (i < serial.length) {
		if (serial[i] == ws) {
			i++;

			continue;
		}

		if (serial[i] != ws) {
			let tok = '';
			while (serial[i] != ws && i < serial.length) {
				tok += serial[i];

				i++;
			}

			cont.push(tok);
		}
	}

	$('#tok .body').empty();
	for (let tok of cont) {
		$('#tok .body').append(`<div class='cont'>${tok}</div>`);
	}

	return cont;
}

function parseExpr(deserCont) {
	let lhs = deserCont[0];
	let rhs = deserCont[2];

	let res;
	switch (deserCont[1]) {
		case op['add']:
			res = lhs + rhs;

			break;

		case op['sub']:
			res = lhs - rhs;

			break;

		case op['mul']:
			res = lhs * rhs;

			break;

		case op['div']:
			res = lhs / rhs;

			break;

		default:
			console.error(`Invalid operator ${deserCont[1]}`);

			break;
	}

	return res;
}

$(document).ready(function() {
	$('#expr').keyup(function() {
		const serial = $('#expr').val();

		let tokCont = tok(serial);
	});
});
