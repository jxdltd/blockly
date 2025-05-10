import { useEffect } from 'preact/hooks';
import { blocklist, loadBlocklist } from '../signals/blocklist';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function BlockList() {
  useEffect(() => {
    loadBlocklist();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blocked</CardTitle>
      </CardHeader>
      <CardContent>
        {blocklist.value.map((host) => (
          <div key={host}>{host}</div>
        ))}
      </CardContent>
    </Card>
  );
}
