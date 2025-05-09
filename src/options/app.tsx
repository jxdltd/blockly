import { BlockList } from './block-list';
import { TabsList } from './tabs-list';

export function App() {
  return (
    <div class="flex min-h-screen flex-col items-center bg-stone-100 p-10">
      <h1 class="mb-5 font-logo font-medium text-2xl text-red-500">Blockly</h1>
      <div class="w-full max-w-xl space-y-10 rounded-2xl border border-stone-300 bg-white p-5 shadow-sm">
        <TabsList />
        <BlockList />
      </div>
    </div>
  );
}
