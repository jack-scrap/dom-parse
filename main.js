const ws = ' ';

function tok(serial) {
	let cont = [];
	let i = 0;
	while (i < serial.length) {
		let c = serial[i];

		if (c == ws) {
			i++;

			continue;
		}

		if (c != ws) {
			let tok = "";
			while (c != ws && i < serial.length) {
				c = serial[i];

				tok += c;

				i++;
			}

			cont.push(tok);
		}
	}

	$('#tok .body').empty();

	for (let tok of cont) {
		$('#tok .body').append(`<div>${tok}</div>`);
	}

	return cont;
}

$(document).ready(function() {
	$('#expr').keyup(function() {
		const serial = $('#expr').val();

		let tokCont = tok(serial);
	});
});
