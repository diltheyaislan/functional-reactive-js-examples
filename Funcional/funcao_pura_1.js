const PI = 3.14;

// Funcao impura porque depende de um valor fora da funcao
function areaCirc(raio) {
	return raio * raio * PI;
}

console.log(areaCirc(10));
console.log(areaCirc(10));
console.log(areaCirc(10));

function areaCircPura(raio, pi) {
	return raio * raio * pi;
}

console.log(areaCircPura(10, 3.14));