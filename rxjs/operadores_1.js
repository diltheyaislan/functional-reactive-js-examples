// dois tipos

// 1. operadores de criação
const { of } = require('rxjs');

// 2. operadores encadeáveis (pipeable operators)
const { last, map } = require('rxjs/operators');


of(1, 2, 'ana', false, 'último')
	.pipe(
			last(),
			map(v => v[0]),
			map(v => `A letra encontrada foi ${v}`)
	)
	.subscribe(valor => {
		console.log(valor);
	});