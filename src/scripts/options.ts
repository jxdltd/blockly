async function getTabs() {
  const tabs = await chrome.tabs.query({});

  return tabs;
}

getTabs().then(console.log);
