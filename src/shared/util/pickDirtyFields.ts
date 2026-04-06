export function pickDirtyFields<T extends Record<string, unknown>>(
  allValues: T,
  dirtyFields: Partial<Record<keyof T, boolean>>,
): Partial<T> {
  return (Object.keys(dirtyFields) as (keyof T)[]).reduce((acc, key) => {
    if (dirtyFields[key]) acc[key] = allValues[key];
    return acc;
  }, {} as Partial<T>);
}