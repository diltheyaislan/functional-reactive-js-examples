// funcao impura porque os dados sao aleatorios e nao previsiveis
function generateRandomNumber(min, max) {
	const factor = max - min + 1;
	return parseInt(Math.random() * factor) + min;
}

console.log(generateRandomNumber(1, 10));
console.log(generateRandomNumber(1, 10));
console.log(generateRandomNumber(1, 10));
console.log(generateRandomNumber(1, 10));
console.log(generateRandomNumber(1, 10));