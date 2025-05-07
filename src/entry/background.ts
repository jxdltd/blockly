const blocklist = [
  "www.youtube.com",
  "youtube.com",
  "deliveroo.co.uk",
  "www.deliveroo.co.uk",
];

async function handle(tabId: number) {
  const tab = await chrome.tabs.get(tabId);

  if (!tab.url) {
    return;
  }

  const url = new URL(tab.url);

  if (blocklist.includes(url.host)) {
    chrome.tabs.update(tabId, {
      url: `chrome-extension://${chrome.runtime.id}/src/entry/blocked.html`,
    });
  }
}

chrome.tabs.onActivated.addListener((info) => handle(info.tabId));
chrome.tabs.onUpdated.addListener((tabId) => handle(tabId));
