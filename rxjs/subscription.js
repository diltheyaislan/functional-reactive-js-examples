// esperar 3000
// gerar número de 500
const { timer, Subscription } = require('rxjs');

const obs = timer(3000, 500);

const sub1 = obs.subscribe(num => {
	console.log(`#1 Gerou o número ${num}`);
});

const sub2 = obs.subscribe(num => {
	console.log(`#2 Gerou o número ${num}`);
});

const sub = new Subscription();
sub.add(sub1);
sub.add(sub2);

// depois de 5000 usubscribe
setTimeout(() => {
	sub.unsubscribe();
}, 5000);
