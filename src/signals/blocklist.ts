import { signal } from '@preact/signals';

export const blocklist = signal<string[]>([]);

export function loadBlocklist() {
  chrome.storage.local.get('blocklist', ({ blocklist: found = [] }) => {
    blocklist.value = found;
  });
}
