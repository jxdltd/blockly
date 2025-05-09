const blocklist = [
  'www.youtube.com',
  'youtube.com',
  'deliveroo.co.uk',
  'www.deliveroo.co.uk',
  'www.netflix.com',
  'netflix.com',
  'www.disneyplus.com',
  'disneyplus.com',
];

async function handle(tabId) {
  const tab = await chrome.tabs.get(tabId);

  if (!tab.url) {
    return;
  }

  const url = new URL(tab.url);

  if (blocklist.includes(url.host)) {
    chrome.tabs.update(tabId, {
      url: `chrome-extension://${chrome.runtime.id}/blocked.html`,
    });
  }
}

chrome.tabs.onActivated.addListener((info) => handle(info.tabId));
chrome.tabs.onUpdated.addListener((tabId) => handle(tabId));
