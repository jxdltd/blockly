async function handle(tabId: number) {
  const { blocklist = [] } = await chrome.storage.local.get('blocklist');
  const tab = await chrome.tabs.get(tabId);

  if (!tab.url) {
    return;
  }

  const url = new URL(tab.url);

  if (blocklist.includes(url.host)) {
    chrome.tabs.update(tabId, {
      url: `chrome-extension://${chrome.runtime.id}/entry/blocked.html`,
    });
  }
}

chrome.tabs.onActivated.addListener((info) => handle(info.tabId));
chrome.tabs.onUpdated.addListener((tabId) => handle(tabId));

chrome.action.onClicked.addListener(() => {
  console.log('Opening options page');
  chrome.runtime.openOptionsPage();
});
