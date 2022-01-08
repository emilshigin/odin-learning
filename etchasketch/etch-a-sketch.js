const applicationContainer = document.querySelector(".application-container");
const sketchTools = document.querySelector("#sketch-tools");
const sketchContainer = document.querySelector("#sketch-container");
let uniqid = 100;

// [TODO] Add cach and defualt values
function get_uniqId() {
  return uniqid++;
}

function removeDegradable(thisId) {
  document.getElementById(thisId).remove();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Buttons for the sketch-tools
function createCanvas(){
  let userInputs = { width: 50, height: 50, layerName: 'sketchBackground', backgroundColor: 'white' };
  const contentForm = `<form><label for='input_width'>Width:<input type="number" id="input_width" size='5' value = ${userInputs.width}></label><label for="input_height">Height:<input type="number" id="input_height" size='5' value = ${userInputs.height} /></label></form>`;
  createDragable(userInputs, contentForm, createlayer);
}

// brush type :id name of button
function brush(brushType) {
  console.log(brushType);
  if (document.getElementById('sketchBackground') == null) {
    console.log('no canvas');
    return;
  }

  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
    //
  window.onclick = e => {
    if (e.target.className == 'pixile') {
      e.target.style.backgroundColor = 'black';
      e = dragMouseDown(e);
    }    
  }

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;this
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (e.target.className == 'pixile') {
      e.target.style.backgroundColor = 'black';
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hellper functions
// userInputs(objectNames,width, height,layerName,backgroundColor) 
function createlayer(userInputs) {
  if (document.getElementById('sketchBackground') == null) {
    const sketchBackground = sketchContainer.appendChild(document.createElement("div"));
    sketchBackground.setAttribute("id", "sketchBackground");
  }
  else if (userInputs.layerName == 'sketchBackground') {
    while (document.getElementById('sketchBackground').firstChild) {
      document.getElementById('sketchBackground').removeChild(document.getElementById('sketchBackground').firstChild);
    }
  }
  // [TODO] Add New Layers
  else if (document.getElementById(userInputs.layerName) == null) {
    console.log('create new layerName');
    console.log('position new layerName z axis');
  }

  const layerName = document.getElementById(userInputs.layerName);
  
  let pixleSize = ((sketchContainer.offsetWidth - 50) / userInputs.width) <= ((sketchContainer.offsetHeight - 50) / userInputs.height) ? ((sketchContainer.offsetWidth - 50) / userInputs.width) : ((sketchContainer.offsetHeight - 50) / userInputs.height);
  pixleSize = pixleSize.toFixed(1);
  let repeatNum = (userInputs.width * userInputs.height);
  layerName.setAttribute("style", `display:flex; flex-wrap:wrap; width:${userInputs.width * pixleSize}px; height:${userInputs.height * pixleSize}px;`);
  
  let allDivs = "";
  for (let i = 0; i < repeatNum; i++) {
    allDivs += `<div class='pixile' style="width:${pixleSize}px; height:${pixleSize}px; background-color:${userInputs.backgroundColor};"></div>`;
  }
  layerName.insertAdjacentHTML('beforeend', allDivs);
}
/////////////////////////////////////////////////////////////////////////
// Dragable window and content form

// [TODO] make a function that makes the contentForm for dragable window

// userInputs is a list of Objects (defualt verables)
// contentForm is html form
// functionApply is what the apply button will apply will be passed to updateUserInputs
function createDragable(userInputs, contentForm, functionApply) {
  const degradableWindow = sketchContainer.appendChild(document.createElement("div"));
  const thisId = get_uniqId();
  degradableWindow.setAttribute("id", `${thisId}`);
  degradableWindow.setAttribute("class", "dragable-window");
  
  const windowName = createDragable.caller.name;
  degradableWindow.innerHTML = `<div id='${thisId}header' class='dragable-header'>${windowName}<span class='close' onclick='removeDegradable(${thisId})'>&times</span></div>`;
  degradableWindow.insertAdjacentHTML('beforeend', `<div class=dragable-content>${contentForm}</div>`);
  degradableWindow.insertAdjacentHTML('beforeend', `<footer><button id='degradablApply'>apply</button></footer>`);
  
  dragElement(degradableWindow);
  document.getElementById("degradablApply").addEventListener("click", () => { updateUserInputs(userInputs,functionApply) ;removeDegradable(thisId); });
}

//updates objects that are passed in from the form
//function apply is the callback function  for createDragable
function updateUserInputs(userInputs,functionApply) {
  let objectName ;
    for (let i = 0; i < Object.keys(userInputs).length; i++) {
      objectName = Object.keys(userInputs)[i];
      if (document.getElementById('input_' + objectName) != null && document.getElementById('input_' + objectName).value != null) {
        userInputs[objectName] = document.getElementById('input_' + objectName).value;
      }
    }
  functionApply(userInputs);
}


// Dragable window
function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id+"header")) {
    console.log('if');
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    console.log('else');
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