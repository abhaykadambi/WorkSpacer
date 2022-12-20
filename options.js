let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
let theBtn = document.getElementById("subbtn");
let divThing = document.getElementById("workspaceThing");
// Reacts to a button click by marking the selected button and saving
// the selection
// function handleButtonClick(event) {
//   // Remove styling from the previously selected color
//   let current = event.target.parentElement.querySelector(
//     `.${selectedClassName}`
//   );
//   if (current && current !== event.target) {
//     current.classList.remove(selectedClassName);
//   }

//   // Mark the button as selected
//   let color = event.target.dataset.color;
//   event.target.classList.add(selectedClassName);
//   chrome.storage.sync.set({ color });
// }

// Add a button to the page for each supplied color
// function constructOptions(buttonColors) {aewd
//     // For each color we were provided…
//     for (let buttonColor of buttonColors) {
//       // …create a button with that color…
//       let button = document.createElement("button");
//       button.dataset.color = buttonColor;
//       button.style.backgroundColor = buttonColor;

//       // …mark the currently selected color…
//       if (buttonColor === currentColor) {
//         button.classList.add(selectedClassName);
//       }

//       // …and register a listener for when that button is clicked
//       button.addEventListener("click", handleButtonClick);
//       page.appendChild(button);
//     }
//   });
// }


function tabOpener(x){
  chrome.storage.sync.get("color", ({color}) => {
    //create the tabs
    for(let tabNum in color[x].urls){
      chrome.tabs.create({
        url: color[x].urls[tabNum],
        // type: "popup"
      }, function(win) {
        // win represents the Window object from windows API
        // Do something after opening
        //alert(win)
      });
    }
  })
}

theBtn.addEventListener("click", async () => {
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // alert('event listener')
  // alert(document.getElementById("urls").value)

  
  chrome.storage.sync.get("color", ({ color }) => {
    // color[0].urls.push(document.getElementById("urls").value);
    // alert(color[0].urls);

    color.push({ "name":document.getElementById("name").value, "urls":document.getElementById("urls").value.split(', ')});

    
    chrome.storage.sync.set({"color":color})
  });
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   function: newWorkspace,
  // });
  // newWorkspace();
});

function makeButtons(){
  chrome.storage.sync.get("color", ({ color }) => {
    // color[0].urls.push(document.getElementById("urls").value);
    // alert(color[0].urls);
    //alert(color[0].urls)
    for(let workUrl in color){
      let button = document.createElement("button");
      let deleteButton = document.createElement("button");
      let newDiv = document.createElement("div");
      //alert(workUrl + color[0])
      button.innerHTML = '<span>' + color[workUrl].name + '<span>';
      deleteButton.innerHTML = '<span>' + "delete" + '<span>';
      newDiv.appendChild(button);
      newDiv.appendChild(deleteButton);
      newDiv.style.display = "block";
      button.addEventListener("click", function() {
        tabOpener(workUrl);
      });
      
      deleteButton.addEventListener("click", function() {
        //delete the old workspace..
        color.splice(workUrl, 1);

        chrome.storage.sync.set({"color":color})
        divThing.removeChild(newDiv);

        //alert(workUrl);
      });

      divThing.appendChild(newDiv);

    }

  });
}

makeButtons()
// function newWorkspace(){
//   // document.getElementById("name").value
//   alert('function')
//   chrome.storage.sync.get("color", ({ color }) => {
//     // color[0].urls.push(document.getElementById("urls").value);
//     alert(color[0].urls);
//   });
// }

// Initialize the page by constructing the color options
// constructOptions(presetButtonColors);