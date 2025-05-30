import type { ComponentChildren, ComponentProps } from 'preact';
import { cn } from './cn';

type DivProps = ComponentProps<'div'>;

export function Card({ children }: { children: ComponentChildren }) {
  return (
    <div class="rounded-2xl border-2 border-stone-700 bg-white">{children}</div>
  );
}

export function CardHeader({ children }: { children: ComponentChildren }) {
  return <div class="border-stone-700 border-b-2 p-5">{children}</div>;
}

export function CardTitle({ children }: { children: ComponentChildren }) {
  return <h2 class="font-medium text-lg text-stone-800">{children}</h2>;
}

export function CardContent({ class: className, ...rest }: DivProps) {
  return <div class={cn('p-5', className)} {...rest} />;
}
