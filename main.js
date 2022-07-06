const ws = ' ';

$(document).ready(function() {
	$('#expr').keydown(function() {
		const expr = $('#expr').val();

		let tokCont = [];
		let i = 0;
		while (i < expr.length) {
			let c = expr[i];

			if (c == ws) {
				i++;

				continue;
			} else {
				let tok = "";
				while (c != ws && i < expr.length) {
					c = expr[i];

					tok += c;

					i++;
				}

				tokCont.push(tok);
			}
		}

		$('#tok').empty();

		for (let tok of tokCont) {
			$('#tok').append(`<div>${tok}</div>`);
		}
	});
});
