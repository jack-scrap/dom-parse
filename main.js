const expr = '3 + 7 + 12';

const ws = ' ';

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

$(document).ready(function() {
	$('#expr').val(expr);

	for (let tok of tokCont) {
		$('#tok').append(`<div>${tok}</div>`);
	}
});
