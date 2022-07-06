const ws = ' ';

$(document).ready(function() {
	$('#expr').keydown(function() {
		const expr = $('#expr').val();

		let tokCont = [];
		let i = 0;
		while (i < expr.length) {
			if (expr[i] == ws) {
				i++;

				continue;
			} else {
				let tok = "";
				while (expr[i] != ws && i < expr.length) {
					tok += expr[i];

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
