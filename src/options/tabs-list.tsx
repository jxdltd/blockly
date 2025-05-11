import { useEffect, useState } from 'preact/hooks';
import { blocklist } from '../signals/blocklist';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type Tab = {
  id: number;
  title: string;
  url: string;
  favIconUrl?: string;
};

async function getTabs(): Promise<Tab[]> {
  const tabs = await chrome.tabs.query({ currentWindow: true });

  return tabs
    .map((t) => {
      if (t.id && t.title && t.url) {
        return {
          id: t.id,
          title: t.title,
          url: t.url,
          favIconUrl: t.favIconUrl,
        };
      }
      return false;
    })
    .filter(Boolean) as Tab[]; // todo use ts-reset
}

export function TabsList() {
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    getTabs().then(setTabs);
  }, []);

  function handleBlock(url?: string) {
    if (!url) {
      return;
    }

    chrome.storage.local.get('blocklist', ({ blocklist: found = [] }) => {
      const host = new URL(url).host;
      if (!found.includes(host)) {
        found.push(host);
        chrome.storage.local.set({ blocklist: found });
        blocklist.value = found;
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Open Tabs</CardTitle>
      </CardHeader>
      <CardContent class="space-y-5">
        {tabs.map((tab) => (
          <div key={tab.id} class="flex items-center gap-3">
            {tab.favIconUrl ? (
              <img
                class="size-10 rounded-lg bg-zinc-100 p-3"
                src={tab.favIconUrl}
                alt={tab.title}
              />
            ) : (
              <div class="size-5 rounded-lg bg-stone-300" />
            )}
            <span>{tab.title}</span>
            <button
              onClick={() => handleBlock(tab.url)}
              type="button"
              class="ml-auto rounded-md bg-red-500 px-2 py-1 font-medium text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Block
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
