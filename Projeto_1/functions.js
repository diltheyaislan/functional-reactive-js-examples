const fs = require('fs');
const path = require('path');

function readDir(dirPath) {
	return new Promise((resolve, reject) => {
		try {
			const files =	fs.readdirSync(dirPath);
			const allFiles = files.map(file => path.join(dirPath, file));
			resolve(allFiles);
		} catch(e) {
			reject(`Error: ${e}`);
		}
	});
}

function readFiles(files) {
	return Promise.all(files.map(file => readFile(file)));
}

function readFile(path) {
	return new Promise((resolve, reject) => {
		try {
			const content = fs.readFileSync(path, { encoding: 'utf-8'});
			resolve(content.toString());
		} catch(e) {
			reject(e);
		}
	});
}

function itemsEndWith(patternText) {
	return function(array){
		return array.filter(item => item.endsWith(patternText));
	}
}

function removeEmptyItems(array) {
	return array.filter(item => item.trim());
}

function removeItemsInclude(patternText) {
	return function(array) {
		return array.filter(item => !item.includes(patternText));
	}
}

function removeItemsContainOnlyNumber(array) {
	return array.filter(item => { 
		const number = parseInt(item.trim());
		return number !== number;
	});
}

function removeSymbolsFromItems(symbols){
	return function(array) {
		return array.map(item => removeSymbolsFromText(symbols, item));
	}
}

function removeSymbolsFromText(symbols, text) {
	return symbols.reduce((acc, symbol) => {
		return acc.split(symbol).join('');
	}, text);
}

function joinArrayItems(array) {
	return array.join(' ');
} 

function splitTextBy(separator) {
	return function (text) {
		return text.split(separator);
	}
}

function groupItems(items){
	return Object.values(items.reduce((group, item) => {
		const key = item.toLowerCase();
		const count = group[key] ? group[key].count + 1 : 1;
		group[key] = { item: key, count }

		return group;
	}, {}));
}

function orderByAttrNumeric(attr, order = 'asc') {
	return function (array) {
		const asc = (o1, o2) => o1[attr] - o2[attr];
		const desc = (o1, o2) => o2[attr] - o1[attr];
		return array.sort(order === 'asc'? asc : desc);
	}
}

module.exports = {
	readDir,
	readFiles,
	readFile,
	itemsEndWith,
	removeEmptyItems,
	removeItemsInclude,
	removeItemsContainOnlyNumber,
	removeSymbolsFromItems,
	joinArrayItems,
	splitTextBy,
	groupItems,
	orderByAttrNumeric
}