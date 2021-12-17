function toggleTheme(element){
  let css = document.getElementById("stylesheet");
  // Dark theme
  if(css.href == "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css") {
    css.href = "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css";
    element.innerHTML = '<img id="theme-switch" src="images/dark.svg">';
  } else {
    css.href = "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css";
    element.innerHTML = '<img id="theme-switch" src="images/light.svg">';
  }
}