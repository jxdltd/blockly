import { buttonVariants } from '~/ui/button';
import '../styles/global.css';

import { BlockList } from './block-list';
import { TabsList } from './tabs-list';

export function App() {
  return (
    <div class="min-h-screen bg-stone-100">
      <div class="grid grid-cols-2 gap-10 p-10">
        <div class="col-span-2 flex items-center justify-between">
          <h1 class="col-span-2 font-logo font-medium text-2xl text-red-500">
            Blockly
          </h1>
          <a
            className={buttonVariants()}
            href="https://github.com/jxdltd/blockly"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <TabsList />
        <BlockList />
      </div>
    </div>
  );
}
