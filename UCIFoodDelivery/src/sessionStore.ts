type StorageLike = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

export const SESSION_KEYS = {
  selectedRestaurant: "zoteats.selectedRestaurant",
  restaurantMenu: "zoteats.restaurantMenu",
  checkoutCart: "zoteats.checkoutCart",
  customerEmail: "zoteats.customerEmail",
} as const;

const memoryStore = new Map<string, string>();

const fallbackStorage: StorageLike = {
  getItem: (key) => memoryStore.get(key) ?? null,
  setItem: (key, value) => {
    memoryStore.set(key, value);
  },
  removeItem: (key) => {
    memoryStore.delete(key);
  },
};

const getStorage = (): StorageLike => {
  const maybeStorage = (globalThis as { sessionStorage?: StorageLike }).sessionStorage;
  if (maybeStorage && typeof maybeStorage.getItem === "function") {
    return maybeStorage;
  }

  return fallbackStorage;
};

export const setSessionJSON = (key: string, value: unknown) => {
  try {
    getStorage().setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write failures for non-web runtimes.
  }
};

export const getSessionJSON = <T>(key: string): T | null => {
  try {
    const raw = getStorage().getItem(key);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const removeSessionKey = (key: string) => {
  try {
    getStorage().removeItem(key);
  } catch {
    // Ignore storage delete failures for non-web runtimes.
  }
};
