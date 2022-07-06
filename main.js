const ws = ' ';

$(document).ready(function() {
	$('#expr').keyup(function() {
		const expr = $('#expr').val();

		let cont = [];
		let i = 0;
		while (i < expr.length) {
			let c = expr[i];

			if (c == ws) {
				i++;

				continue;
			}

			if (c != ws) {
				let tok = "";
				while (c != ws && i < expr.length) {
					c = expr[i];

					tok += c;

					i++;
				}

				cont.push(tok);
			}
		}

		$('#tok').empty();

		for (let tok of cont) {
			$('#tok').append(`<div>${tok}</div>`);
		}
	});
});
