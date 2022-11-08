import { isNullOrUndefined, isObject, isUndefined } from './assertion';

export function compact<T>(array: T[]): T[] {
  return array.filter(Boolean);
}

export function getError<T>(obj: T, path: string, defaultValue?: unknown): any {
  if (!path || !isObject(obj)) {
    return defaultValue;
  }

  const result = compact(path.split(/[,[\].]+?/)).reduce(
    (result, key) =>
      isNullOrUndefined(result) ? result : result[key as keyof {}],
    obj,
  );

  return isUndefined(result) || result === obj
    ? isUndefined(obj[path as keyof T])
      ? defaultValue
      : obj[path as keyof T]
    : result;
}

export function optimizeAnimation(callback: () => void) {
  let ticking = false;

  return () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
    }
  };
}

export const delayPromise = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000000000000);
};
