function toggleTheme(element){
  let css = document.getElementById("stylesheet");
  // Dark theme
  if(css.href == "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css") {
    css.href = "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css";
    element.innerHTML = 'Dark Theme';
    element.style.backgroundColor = "#f7f7f7"
    element.style.border = "1px solid #e3e3e3"
  } else {
    css.href = "https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple-dark.css";
    element.innerHTML = 'Light Theme';
    element.style.backgroundColor = "#242e33"
    element.style.border = "1px solid #34434b"
  }
}