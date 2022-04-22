function toggleTheme(element){
  let css = document.getElementById("stylesheet");
  let color = document.getElementById("stylesheet-color");
  // Dark theme
  if(css.href == "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css") {
    css.href = "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css";
    color.href = "color-light.css";
    element.innerHTML = 'Dark Theme';
  } else {
    css.href = "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css";
    color.href = "color-dark.css";
    element.innerHTML = 'Light Theme';
  }
}