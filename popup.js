let closeAll = document.getElementById('closeAll');

closeAll.onclick = function() {
  chrome.storage.sync.get(['open'], function(result) {
    var opentabs = result.open;
    chrome.tabs.create({index:0});
    chrome.tabs.remove(opentabs);
  });
}

let pin = document.getElementById('pin');

pin.onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.storage.sync.get(['pinned'], function(result) {
      var pinned = result.pinned;
      pinned.push(tabs[0].id);
      chrome.storage.sync.set({pinned:pinned}, function () {
        console.log("pinned");
      });
    });
  });
}

let closeUnpin = document.getElementById('closeUnpin');

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

closeUnpin.onclick = function() {
  chrome.storage.sync.get(['open'], function(result) {
    var opentabs = result.open;
    chrome.storage.sync.get(['pinned'], function(result) {
      var pinned = result.pinned;
      console.log(opentabs, pinned);
      if (pinned.length === 0){
        chrome.tabs.create({index:0});
        chrome.tabs.remove(opentabs);
      } else {
        chrome.tabs.remove(opentabs.diff(pinned));
        chrome.storage.sync.set({open:pinned});
      }
    });
  });
}
