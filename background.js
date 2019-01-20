chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab_ids = [];
    tabs.forEach(function(tab){
      tab_ids.push(tab.id);
    });
    chrome.storage.sync.set({open: tab_ids}, function() {
      console.log("IDs have been added.");
    });
  });
 });
