// background.js

let color = [{"name":"Example Work Space", "urls":['https://youtube.com', 'https://amazon.com']}];


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  //console.log('Default background color set to %cgreen', `color: ${color}`);
  // chrome.tabs.create({url: "http://google.com"}, callback)
});
function callback(data){
  console.log(data)
}
// chrome.browserAction.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ['contentScript.js']
//   });
// });
 