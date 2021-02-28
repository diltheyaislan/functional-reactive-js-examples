const path = require('path');
const fns = require('./functions');

const dirPath = path.join(__dirname, 'dados', 'legendas');

const symbols = [
	'.', '?', '-', ',', '"', '♪', '_', '<i>', '</i>', '/r', '[', ']',	'(', ')'
]

fns.readDir(dirPath)
	.then(files => fns.itemsEndWith('.srt')(files))
	.then(fns.readFiles)
	.then(fns.joinArrayItems)
	.then(fns.splitTextBy('\n'))
	.then(fns.removeEmptyItems)
	.then(fns.removeItemsInclude('-->'))
	.then(fns.removeItemsContainOnlyNumber)
	.then(fns.removeSymbolsFromItems(symbols))
	.then(fns.joinArrayItems)
	.then(fns.splitTextBy(' '))
	.then(fns.removeEmptyItems)
	.then(fns.removeItemsInclude('<font'))
	.then(fns.removeItemsInclude('</font'))
	.then(fns.removeItemsInclude('color='))
	.then(fns.removeItemsContainOnlyNumber)
	.then(fns.groupItems)
	.then(fns.orderByAttrNumeric('count', 'desc'))
	.then(console.log);