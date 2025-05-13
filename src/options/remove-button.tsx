import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useEffect, useRef, useState } from 'preact/hooks';
import { blocklist } from '../signals/blocklist';

type Props = {
  host: string;
};

const waitSeconds = 60;

export function RemoveButton({ host }: Props) {
  const [open, setOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(waitSeconds);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSecondsRemaining(waitSeconds);
    if (open) {
      const id = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            intervalId.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      intervalId.current = id;
    } else if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  }, [open]);

  function handleRemove(host: string) {
    blocklist.value = blocklist.value.filter((h) => h !== host);
    chrome.storage.local.set({ blocklist: blocklist.value });
  }

  return (
    <>
      <button
        type="button"
        class="rounded px-2 py-1 font-medium text-sm hover:bg-stone-50"
        onClick={() => setOpen(true)}
      >
        Remove
      </button>
      <Dialog
        open={open}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setOpen(false)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-200 ease-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-closed:transform-[scale(95%)] w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="font-medium">
                Are you sure?
              </DialogTitle>
              <p className="mt-2 text-sm">
                Wait a second! Are you sure you want to remove {host} from the
                blocklist?
              </p>
              <div className="mt-4">
                <Button
                  disabled={secondsRemaining > 0}
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 font-semibold text-sm/6 text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none disabled:opacity-50 data-hover:bg-gray-600 data-open:bg-gray-700 data-focus:outline data-focus:outline-white"
                  onClick={() => {
                    handleRemove(host);
                    setOpen(false);
                  }}
                >
                  {secondsRemaining > 0
                    ? `Wait ${secondsRemaining}s`
                    : 'Yes, remove!'}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
