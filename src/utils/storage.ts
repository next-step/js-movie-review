export const getStoredData = <T>(storageKey: string): Record<number, T> => {
  return JSON.parse(localStorage.getItem(storageKey) || "{}");
};

export const setStoredData = <T>(
  storageKey: string,
  key: number,
  data: T
): void => {
  const storedData: Record<number, T> = getStoredData<T>(storageKey);
  storedData[key] = data;
  localStorage.setItem(storageKey, JSON.stringify(storedData));
};
