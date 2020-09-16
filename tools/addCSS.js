/*
Description: Inject CSS template
Technologies: JavaScript ES6
Author: Chester Militante 
To test, go to any website and then open console and paste the entire code below, and then use addCSS();
*/

function addCSS() {
  const styleNode = document.createElement("style");
  styleNode.id = "custom-css";
  styleNode.innerHTML = `
  a { 
    color: #009cde; 
  }
  b, strong { 
    font-weight: bold 
  }
  `;
  document.head.appendChild(styleNode);  
}