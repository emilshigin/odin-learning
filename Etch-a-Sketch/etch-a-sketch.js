const applicationContainer = document.querySelector(".application-container");
const sketchTools = document.querySelector("#sketch-tools");
const sketchContainer = document.querySelector("#sketch-container");
let uniqid = 100;

function uniqId() {
  return uniqid++;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function createCanvas(){
  const background = sketchContainer.appendChild(document.createElement("div"));
  let userInputs = { width: 50, height: 50, layerName: 'background', backgroundColor: 'white' };
  const contentForm = `<form><lable for="width">Width</lable><input type="number" name="width" id="input_width" value = ${userInputs.width}><lable for="height">height</lable><input type="number" name="height" id="input_height" value = ${userInputs.height} /></form>`;
  createDragable(userInputs, contentForm, createlayer);
}

// userInputs(objectNames,width, height,layerName,backgroundColor) 
function createlayer(userInputs) {
  if (document.getElementById('background') == null) {
    const background = sketchContainer.appendChild(document.createElement("div"));
    background.setAttribute("id", "background");
  }
  else if (userInputs.layerName == 'background') {
    while (document.getElementById('background').firstChild) {
      document.getElementById('background').removeChild(document.getElementById('background').firstChild);
    }
  }
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

// defualt user inputs is a list of Objects
// contentForm is html form that should also load the defualt inputs
//callback should be called id exited or apply button is clicked
function createDragable(userInputs, contentForm, functionApply) {
  const degradableWindow = sketchContainer.appendChild(document.createElement("div"));
  const thisId = uniqId();
  degradableWindow.setAttribute("id", `${thisId}`);
  degradableWindow.setAttribute("class", "dragable-window");
  dragElement(degradableWindow);

  degradableWindow.innerHTML = `<div id="dragable-header"><span class='close' onclick='removeDegradable(${thisId})'>&times</span></div>`;
  degradableWindow.insertAdjacentHTML('beforeend', `<div class=dragable-content>${contentForm}</div>`);
  degradableWindow.insertAdjacentHTML('beforeend', `<footer><button id='degradablApply'>apply</button></footer>`);
  
  document.getElementById("degradablApply").addEventListener("click", () => { updateUserInputs(userInputs,functionApply) ;removeDegradable(thisId); });
}

//get the name of every object 
//check if an id exists the the same id  
//then check its value and update
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

/////////////////////////////////////////////////////////////////////////
// [TODO] else load sketck from memory
// change the if statment to look into cached sketches
function removeDegradable(thisId) {
  document.getElementById(thisId).remove();
}

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
////////////////////////////////////////////////////////////////////////////
// brush type :id name of button
function brush(brushType) {
  console.log(brushType);
  if (document.getElementById('background') == null) {
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