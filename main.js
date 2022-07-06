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

	return cont;
}

function deser(tokCont) {
	let cont = [];

	let i = 0;
	while (i < tokCont.length) {
		// number
		if (!isNaN(tokCont[i])) {
			cont.push(Number(tokCont[i]));

			i++;

			continue;
		}

		// operator
		if (
			tokCont[i] == op['add'] ||
			tokCont[i] == op['sub'] ||
			tokCont[i] == op['mul'] ||
			tokCont[i] == op['div']
		) {
			cont.push(tokCont[i]);

			i++;

			continue;
		}
	}

	return cont;
}

function parseExpr(deserCont) {
	let lhs = deserCont[0];
	let rhs = deserCont[2];

	let oper = deserCont[1];

	let res;
	switch (oper) {
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
			res = `Invalid operator ${op}`;

			break;
	}

	return res;
}

$(document).ready(function() {
	$('#expr').keyup(function() {
		const serial = $('#expr').val();

		const tokCont = tok(serial);

		const deserCont = deser(tokCont);

		const res = parseExpr(deserCont);

		$('#tok .body').empty();
		for (let tok of tokCont) {
			$('#tok .body').append(`<div class='cont'>${tok}</div>`);
		}
	});
});
