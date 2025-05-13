import { useEffect, useState } from 'preact/hooks';
import { Button } from '~/ui/button';
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
      <CardContent class="space-y-8">
        {tabs.map((tab) => (
          <div key={tab.id} class="flex items-center gap-3">
            {tab.favIconUrl ? (
              <img
                class="size-10 rounded-xl bg-stone-800 p-3"
                src={tab.favIconUrl}
                alt={tab.title}
              />
            ) : (
              <div class="size-10 rounded-xl bg-stone-800" />
            )}
            <span class="mr-auto truncate text-lg">{tab.title}</span>
            <Button onClick={() => handleBlock(tab.url)} type="button">
              Block
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
