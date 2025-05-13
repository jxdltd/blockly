import { useEffect } from 'preact/hooks';
import { blocklist, loadBlocklist } from '../signals/blocklist';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RemoveButton } from './remove-button';

export function BlockList() {
  useEffect(() => {
    loadBlocklist();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blocked</CardTitle>
      </CardHeader>
      <CardContent class="space-y-5">
        {blocklist.value.map((host) => (
          <div key={host} class="flex items-center justify-between">
            <span>{host}</span>
            <RemoveButton host={host} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
