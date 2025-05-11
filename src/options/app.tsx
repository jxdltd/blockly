import '../styles/global.css';

import { BlockList } from './block-list';
import { TabsList } from './tabs-list';

export function App() {
  return (
    <div class="min-h-screen bg-stone-100">
      <div class="grid grid-cols-2 gap-10 p-10">
        <h1 class="col-span-2 font-logo font-medium text-2xl text-red-500">
          Blockly
        </h1>
        <TabsList />
        <BlockList />
      </div>
    </div>
  );
}
