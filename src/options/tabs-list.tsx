import { useEffect, useState } from 'preact/hooks';

function getTabs(): Promise<chrome.tabs.Tab[]> {
  return chrome.tabs.query({ currentWindow: true });
}

export function TabsList() {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);

  useEffect(() => {
    getTabs().then(setTabs);
  }, []);

  return (
    <div>
      <div class="mb-5 font-medium text-lg">Open Tabs</div>
      <div class="space-y-3">
        {tabs.map((tab) => (
          <div key={tab.id} class="flex items-center gap-3">
            {tab.favIconUrl ? (
              <img class="size-5" src={tab.favIconUrl} alt={tab.title} />
            ) : (
              <div class="size-5 rounded-lg bg-stone-300" />
            )}
            <span>{tab.title}</span>
            <button type="button" class="ml-auto border">
              Block
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
