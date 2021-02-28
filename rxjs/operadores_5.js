const { of, Observable} = require('rxjs');

function terminadoCom(parteFinal) {
	return function(source) {
		return new Observable(subscriber => {
			source.subscribe({
				next(texto) {
					if (texto.endsWith(parteFinal)) {
						subscriber.next(texto);
					}
				},
				error(e) {
					subscriber.error(e)
				},
				complete() {
					subscriber.complete()
				}
			})
		});
	}
}

of('Ana Silva', 'Maria Silva', 'Pedro Rocha')
	.pipe(terminadoCom('Silva'))
	.subscribe(console.log);