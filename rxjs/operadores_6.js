const { Observable, from } = require("rxjs");

function createPipeableOperator(nextGenerator) {
	return function(source) {
		return new Observable(subscriber => {
			source.subscribe({
				next: nextGenerator(subscriber)
			})
		});
	}
}

function primeiro() {
	return createPipeableOperator(
		function (subscriber) {
			return function (valor) {
				subscriber.next(valor);
				subscriber.complete();
			}
		}
	);
}

function ultimo() {
	return function(source) {
		return new Observable(subscriber => {
			let ultimo;
			source.subscribe({
				next(v) {
					ultimo = v;
				},
				complete() {
					subscriber.next(ultimo);
					subscriber.complete();
				}
			})
		});
	}
}

from([1, 2, 3, 4, 5])
	.pipe(primeiro())
	.subscribe(console.log);

from([1, 2, 3, 4, 5])
	.pipe(ultimo())
	.subscribe(console.log);