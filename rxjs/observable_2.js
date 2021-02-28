const { Observable, noop } = require('rxjs');

const obs = Observable.create(subscriber => {
	subscriber.next('RxJS');
	subscriber.next('é');
	subscriber.next('legal');

	if (Math.random() > 0.5) {
		subscriber.complete();
	} else {
		subscriber.error('Que problema...');
	}
});

obs.subscribe(
	valor => console.log(`Valor: ${valor}`),
	erro => console.log(`Erro: ${erro}`),
	() => console.log('Fim')
);

obs.subscribe(
	valor => console.log(`Valor: ${valor}`),
	noop, // não trata o erro
	() => console.log('Fim')
);

obs.subscribe(
	{
		next(valor) {
			console.log(`Valor: ${valor}`);
		},
		error(erro) {
			console.log(`Erro: ${erro}`);
		},
		complete() {
			console.log('Fim');
		}
	}
);
