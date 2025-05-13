import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Button } from '~/ui/button';
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

  const canRemove = secondsRemaining <= 0;

  return (
    <>
      <Button intent="destructive" onClick={() => setOpen(true)}>
        Remove
      </Button>
      <Dialog
        open={open}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setOpen(false)}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 duration-200 ease-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-closed:transform-[scale(95%)] w-full max-w-md rounded-xl border-2 border-stone-800 bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="font-medium">
                Are you sure?
              </DialogTitle>
              <p className="mt-2 text-sm">
                Wait a second! Are you sure you want to remove {host} from the
                blocklist?
              </p>
              <div className="mt-4">
                {canRemove ? (
                  <Button
                    key="confirm"
                    intent="destructive"
                    onClick={() => {
                      handleRemove(host);
                      setOpen(false);
                    }}
                  >
                    Yes, remove!
                  </Button>
                ) : (
                  <Button disabled key="wait">
                    Wait {secondsRemaining}s
                  </Button>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
