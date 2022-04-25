function pagelink(hook, vm) {

	const regex =  /\[pagelink "(.*)":"(.*)"\]/;

	hook.beforeEach(function(content, vm) {
		return content;
	});

}


if (window) {
	window.$docsify = window.$docsify || {};

	// Init plugin
	window.$docsify.plugins = [].concat(
		pagelink,
		(window.$docsify.plugins || [])
	);
}