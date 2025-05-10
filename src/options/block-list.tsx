import { useEffect } from 'preact/hooks';
import { blocklist, loadBlocklist } from '../signals/blocklist';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function BlockList() {
  useEffect(() => {
    loadBlocklist();
  }, []);

  function handleRemove(host: string) {
    blocklist.value = blocklist.value.filter((h) => h !== host);
    chrome.storage.local.set({ blocklist: blocklist.value });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blocked</CardTitle>
      </CardHeader>
      <CardContent class="space-y-5">
        {blocklist.value.map((host) => (
          <div key={host} class="flex items-center justify-between">
            <span>{host}</span>
            <button
              type="button"
              class="rounded px-2 py-1 font-medium text-sm hover:bg-stone-50"
              onClick={() => handleRemove(host)}
            >
              Remove
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
