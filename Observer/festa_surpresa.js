const readline = require('readline');

function obterResposta(pergunta) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,	
	});

	return new Promise(resolve => {
		rl.question(pergunta, resp => {
			resolve(resp);
			rl.close();
		});
	});
}

function namorada() {
	setTimeout(() => {
		console.log('N: Apagar as luzes');
		console.log('N: Pedir silêncio');
		console.log('N: Surpresa!!!!');
	}, 2000);
};

function sindico() {
	setTimeout(() => {
		console.log('S: Monitorando barulho');
	}, 1000);
}

async function porteiro(...interessados) {
	while(true) {
		const resp = await obterResposta('O namorado chegou? (s/N/q) ');
		if (resp.toLowerCase() === 's') {
			(interessados || []).forEach(obs => obs());
		} else if (resp.toLowerCase() === 'q') {
			break;
		}
	}
}

/**
 * Chamada da função -> Registrar os dois observadores
 * Os observadores são: namorada e sindico
 * O subject é o porteiro
 */
porteiro(namorada, sindico);