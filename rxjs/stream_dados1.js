function gerarNumeros(fn) {
	return {
		iniciar(fn, intervalo = 1000) {
			let numero = 0;
			const i = setInterval(() => {
				fn(numero++)
			}, intervalo);

			return {
				parar() {
					clearInterval(i);
				}
			}
		}
	}
}

const temp1 = gerarNumeros();
const exec1 = temp1.iniciar(num => {
	console.log(`#1: ${num * 2}`);
}, 1000);

const temp2 = gerarNumeros();
const exec2 = temp2.iniciar(num => {
	console.log(`#2: ${num + 100}`);
}, 2000);

setTimeout(() => {
	exec1.parar();
	exec2.parar();
}, 10000);