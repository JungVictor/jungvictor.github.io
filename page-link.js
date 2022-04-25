function pagelink(hook, vm) {

	const regex =  /\[pagelink "(.*)":"(.*)"\]/;

	hook.beforeEach(function(content, vm) {
		content = content.replace(regex, "<div class='page-link'><a href='$2'>$1</a></div>")
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