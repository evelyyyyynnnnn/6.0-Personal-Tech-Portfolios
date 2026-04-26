/**
 * @param {string|RegExp} input The route pattern
 * @param {boolean} [loose] Allow open-ended matching. Ignored with `RegExp` input.
 */
function parse(input, loose) {
	if (input instanceof RegExp) return { keys:false, pattern:input };
	var c, o, tmp, ext, keys=[], pattern='', arr = input.split('/');
	arr[0] || arr.shift();

	while (tmp = arr.shift()) {
		c = tmp[0];
		if (c === '*') {
			keys.push(c);
			pattern += tmp[1] === '?' ? '(?:/(.*))?' : '/(.*)';
		} else if (c === ':') {
			o = tmp.indexOf('?', 1);
			ext = tmp.indexOf('.', 1);
			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
		} else {
			pattern += '/' + tmp;
		}
	}

	return {
		keys: keys,
		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
	};
}

var RGX = /(\/|^)([:*][^/]*?)(\?)?(?=[/.]|$)/g;

// error if key missing?
function inject(route, values) {
	return route.replace(RGX, (x, lead, key, optional) => {
		x = values[key=='*' ? key : key.substring(1)];
		return x ? '/'+x : (optional || key=='*') ? '' : '/' + key;
	});
}

exports.inject = inject;
exports.parse = parse;