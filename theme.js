function toggleTheme(element){
  let css = document.getElementById("stylesheet");
  // Dark theme
  if(css.href == "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css") {
    css.href = "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css";
    element.innerHTML = 'Dark Theme';
    element.style.backgroundColor = "rgba(0,0,0,0.1)"
    element.style.border = "1px solid rgba(0, 0, 0, 0.2)"
  } else {
    css.href = "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css";
    element.innerHTML = 'Light Theme';
    element.style.backgroundColor = "rgba(0,0,0,0.3)"
    element.style.border = "1px solid rgba(0, 0, 0, 0.5)"
  }
}