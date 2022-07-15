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

		return err(`Invalid token "${tokCont[i]}"`);
	}

	return cont;
}

function serialExpr(deserCont) {
	return `${deserCont[0]} ${deserCont[1]} ${deserCont[2]}`;
}

function parseExpr(deserCont) {
	let lhs = deserCont[0];
	let rhs = deserCont[2];

	let oper = deserCont[1];

	if (typeof lhs != 'number') {
		return err(`Invalid type for left-hand operand "${lhs}"`);
	}

	if (typeof rhs != 'number') {
		return err(`Invalid type for right-hand operand "${rhs}"`);
	}

	if (typeof oper != 'string') {
		return err(`Invalid type for operator "${oper}"`);
	}

	// assert
	if (oper == op['div'] && rhs == 0) {
		return err(`Division by zero`);
	}

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
			res = `Invalid operator "${oper}"`;

			break;
	}

	return res;
}

function err(msg) {
	let full = "";

	full += "Error: ";
	full += msg;

	return `<span style='color: red'>${full}</span>`;
}

$(document).ready(function() {
	$('#expr').keyup(function() {
		const serial = $('#expr').val();

		const tokCont = tok(serial);

		$('#tok .body').empty();
		for (let tok of tokCont) {
			$('#tok .body').empty().append(`<div class='cont'>${tok}</div>`);
		}

		if (!tokCont.length) {
			$('#res .body').empty().append(err('No tokens'));

			return;
		}

		if (tokCont.length < 3) {
			$('#res .body').empty().append(err('Less tokens than required'));

			return;
		}

		if (!(tokCont.length % 2)) {
			$('#res .body').empty().append(err('Inappropriate number of tokens'));

			return;
		}

		const deserCont = deser(tokCont);

		if (typeof deserCont == 'string') {
			$('#res .body').empty().append(deserCont);

			return;
		}

		$('#expr .body').empty();

		let i = 0;
		let acc = 0;
		while (i < deserCont.length - 2) {
			let lhs;
			if (i) {
				lhs = acc;
			} else {
				lhs = deserCont[i];
			}

			$('#expr .body').empty().append(`<div class='cont'>${serialExpr([lhs, deserCont[i + 1], deserCont[i + 2]])}</div>`);

			if (i) {
				acc = parseExpr([
					acc,
					deserCont[i + 1],
					deserCont[i + 2]
				]);
			} else {
				acc = parseExpr([
					deserCont[i],
					deserCont[i + 1],
					deserCont[i + 2]
				]);
			}

			i += 1 + 1;
		}

		const res = acc;

		$('#res .body').empty().append(res);
	});
});
