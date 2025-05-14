import { type VariantProps, cva } from 'class-variance-authority';
import type { ComponentProps } from 'preact';
import { cn } from './cn';

export const buttonVariants = cva(
  'cursor-pointer rounded-xl px-3 py-2 font-medium text-sm',
  {
    variants: {
      intent: {
        primary:
          'border-2 border-stone-800 bg-white transition-colors not-disabled:hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50',
        destructive:
          'border-2 border-red-500 bg-red-500 text-white transition-colors hover:border-red-600 hover:bg-red-600',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
);

type Props = ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

export function Button({ class: className, intent, ...rest }: Props) {
  return (
    <button
      class={cn(
        buttonVariants({
          intent,
        }),
        className
      )}
      {...rest}
    />
  );
}
