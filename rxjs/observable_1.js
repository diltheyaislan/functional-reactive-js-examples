const { Observable } = require('rxjs');

const promise = new Promise(resolve => {
	resolve('Promise é legal')
});

promise.then(console.log);

const obs = new Observable(subscriber => {
	subscriber.next('Observer é bem legal');
	setTimeout(() => {
		subscriber.next('legal!');
		subscriber.complete();
	});
});

obs.subscribe(console.log);