const { interval, from } = require('rxjs');

const gerarNumeros = interval(500);

const sub1 = gerarNumeros.subscribe(num => {
	console.log(Math.pow(2, num));
});

setTimeout(() => {
	sub1.unsubscribe();
}, 8000);

// gerarNumeros.subscribe(num => console.log(num));

from(['A', 'B', 'C']).subscribe(console.log);