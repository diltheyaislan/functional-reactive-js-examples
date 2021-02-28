const path = require('path');
const fns = require('./functions');
const _ = require('lodash');
const { map, groupBy, mergeMap, reduce, toArray } = require('rxjs/operators');

const dirPath = path.join(__dirname, 'dados', 'legendas');

const symbols = [
	'.', '?', '-', ',', '"', '♪', '_', '<i>', '</i>', '/r', '[', ']',	'(', ')', '!'
]

fns.readDir(dirPath)
	.pipe(
		fns.itemsEndWith('.srt'),
		fns.readFile(),
		fns.splitTextBy('\n'),
		fns.removeEmptyItems(),
		fns.removeItemsContainOnlyNumber(),
		fns.removeSymbolsFromItems(symbols),
		fns.splitTextBy(' '),
		fns.removeEmptyItems(),
		fns.removeItemsInclude('<font'),
		fns.removeItemsInclude('</font'),
		fns.removeItemsInclude('color='),
		fns.removeItemsContainOnlyNumber(),
		groupBy(item => item),
		mergeMap(group => group.pipe(toArray())),
		map(words => ({item: words[0], count: words.length})),
		toArray(),
		map(array => _.sortBy(array, item => -item.count))
	)
	.subscribe(console.log);