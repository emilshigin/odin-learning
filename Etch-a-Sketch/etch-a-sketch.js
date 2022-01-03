const applicationContainer = document.querySelector(".application-container");
const sketchTools = document.querySelector("#sketch-tools");
const sketchContainer = document.querySelector("#sketch-container");

console.log("width:", sketchContainer.offsetWidth);
console.log("height:", sketchContainer.offsetHeight);

function createCanvas() {
  const degradableWindow = sketchContainer.appendChild(
    document.createElement("div")
  );
  degradableWindow.setAttribute("id", "dragable-window");
  dragElement(degradableWindow);
  degradableWindow.innerHTML = `<div id="dragable-header"><span class='close' onclick='removeDegradable(document.querySelector("#dragable-window"))'>&times</span></div><footer><button onclick='alert("Help")'>apply</button></footer>`;
  //   created background layer
  //   const background = sketchContainer.appendChild(document.createElement("div"));
  //   background.setAttribute("style", "width:200px");
  console.log("created background");
}

function removeDegradable(e) {
  console.log(e);
  e.remove();
}

// [TODO] else load sketck from memory
// change the if statment to look into cached sketches

// Dragable window
function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
