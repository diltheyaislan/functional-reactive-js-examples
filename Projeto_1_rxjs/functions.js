const fs = require('fs');
const path = require('path');
const { Observable } = require('rxjs');

function readDir(dirPath) {
	return new Observable(subscriber => {
		try {
			fs.readdirSync(dirPath).forEach(file => {
				subscriber.next(path.join(dirPath, file));
			});
			subscriber.complete();
		} catch(e) {
			subscriber.error(e);
		}
	});
}

function readFiles(files) {
	return Promise.all(files.map(file => readFile(file)));
}

function readFile() {
	return createPipeableOperator(subscriber => ({
		next(path) {
			try {
				const content = fs.readFileSync(path, { encoding: 'utf-8'});
				subscriber.next(content.toString());
			} catch(e) {
				subscriber.error(e);
			}
		}
	}));
}

function itemsEndWith(patternText) {
	return createPipeableOperator(subscriber => ({
			next(text) {
				if (text.endsWith(patternText)) {
					subscriber.next(text);
				}
			}
		}));
}

function removeEmptyItems() {
	return createPipeableOperator(subscriber => ({
		next(text) {
			if (text.trim()) {
				subscriber.next(text);
			}
		}
	}));
}

function splitTextBy(separator) {
	return createPipeableOperator(subscriber => ({
		next(text) {
			text.split(separator).forEach(part => {
				subscriber.next(part);
			});
		}
	}));
}

function removeItemsContainOnlyNumber() {
	return createPipeableOperator(subscriber => ({
		next(text) {
			const number = parseInt(text.trim());
			if(number !== number) {
				subscriber.next(text);
			}
		}
	}));
}

function removeSymbolsFromItems(symbols){
	return createPipeableOperator(subscriber => ({
		next(text) {
			const textWithoutSymbols = removeSymbolsFromText(symbols, text);
			subscriber.next(textWithoutSymbols.trim());
		}
	}));
}

function removeItemsInclude(patternText) {
	return createPipeableOperator(subscriber => ({
		next(text) {
			if (!text.includes(patternText)) {
				subscriber.next(text);
			}
		}
	}));
}

function groupItems(){
	return createPipeableOperator(subscriber => ({
		next(words) {
			const grouped =	Object.values(
					words.reduce((group, item) => {
						const key = item.toLowerCase();
						const count = group[key] ? group[key].count + 1 : 1;
						group[key] = { item: key, count }	
						return group;
					}, {})
			);
			subscriber.next(grouped);
		}
	})); 
}

function removeSymbolsFromText(symbols, text) {
	return symbols.reduce((acc, symbol) => {
		return acc.split(symbol).join('');
	}, text);
}

function joinArrayItems(array) {
	return array.join(' ');
} 

function orderByAttrNumeric(attr, order = 'asc') {
	return function (array) {
		const asc = (o1, o2) => o1[attr] - o2[attr];
		const desc = (o1, o2) => o2[attr] - o1[attr];
		return array.sort(order === 'asc'? asc : desc);
	}
}

function createPipeableOperator(operatorFn) {
	return function(source) {
		return new Observable(subscriber => {
			const sub = operatorFn(subscriber);
			source.subscribe({
				next: sub.next,
				error: sub.error || (e => subscriber.error(e)),
				complete: sub.complete || (e => subscriber.complete(e))
			});
		});
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