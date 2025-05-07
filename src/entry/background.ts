console.log("content script loaded");

const blocklist = ["https://www.youtube.com"];

chrome.tabs.onActivated.addListener(async (info) => {
  const tab = await chrome.tabs.get(info.tabId);

  if (!tab.url) {
    return;
  }

  const url = new URL(tab.url);

  if (blocklist.includes(url.origin)) {
    chrome.tabs.update(info.tabId, {
      url: `chrome-extension://${chrome.runtime.id}/src/entry/blocked.html`,
    });
  }
});
