let changeColor = document.getElementById("changeColor");
let divThing = document.getElementById("workspaceThing");
// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

changeColor.addEventListener("click", async () => {
    // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id },
    //   function: setPageBackgroundColor,
    // });
    chrome.tabs.create({
      url: chrome.runtime.getURL("options.html"),
      // type: "popup"
    }, function(win) {
      // win represents the Window object from windows API
      // Do something after opening
      //alert(win)
    });
  });
 
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

function makeButtons(){
  chrome.storage.sync.get("color", ({ color }) => {
    // color[0].urls.push(document.getElementById("urls").value);
    // alert(color[0].urls);
    // alert(color[0].urls)
    for(let workUrl in color){
      let button = document.createElement("button");
      //alert(workUrl + color[0])
      button.innerHTML = '<span>' + color[workUrl].name + '<span>';

      button.addEventListener("click", function() {
        tabOpener(workUrl);
      });

      divThing.appendChild(button);
    }

  });
}
makeButtons()
  // The body of this function will be executed as a content script inside the
  // current page
  // function setPageBackgroundColor() {
  //   chrome.storage.sync.get("color", ({ color }) => {
  //     document.body.style.backgroundColor = color;
  //   });
  // }