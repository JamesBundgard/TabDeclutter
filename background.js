chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({pinned: []}, function() {
    console.log("Pins initialized.");
  });
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    var tab_ids = [];
    tabs.forEach(function(tab){
      tab_ids.push(tab.id);
    });
    chrome.storage.sync.set({open: tab_ids}, function() {
      console.log("IDs have been added.");
    });
  });
});


chrome.tabs.onCreated.addListener(function(tab) {
  chrome.storage.sync.get(['open'], function(result){
    result.open.push(tab.id);
    chrome.storage.sync.set({open: result.open}, function() {
      console.log(result.open.length);
    });
  });
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.storage.sync.get(['open'], function(result){
    result.open = result.open.filter(function(item) {
      return item !== tabId;
    })
    chrome.storage.sync.set({open: result.open}, function() {
      console.log(result.open.length);
    });
  });
});
