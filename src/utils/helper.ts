export type DebouncedFunction<F extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<F>
) => void & {
  cancel: () => void;
};

export function debounce<F extends (...args: unknown[]) => unknown>(
  func: F,
  wait: number
): DebouncedFunction<F> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const debounced = function (this: unknown, ...args: Parameters<F>): void {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  } as DebouncedFunction<F>;

  return debounced;
}
