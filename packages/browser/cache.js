export function createMemoryCache({ maxEntries = 100, ttlMs = 15 * 60 * 1000 } = {}) {
  const store = new Map();
  return {
    get(key) {
      const hit = store.get(key);
      if (!hit) return undefined;
      if (hit.expires && hit.expires < Date.now()) { store.delete(key); return undefined; }
      store.delete(key); store.set(key, hit);
      return hit.value;
    },
    set(key, value, customTtlMs = ttlMs) {
      if (store.size >= maxEntries) store.delete(store.keys().next().value);
      store.set(key, { value, expires:customTtlMs ? Date.now() + customTtlMs : 0 });
    },
    delete(key) { store.delete(key); },
    clear() { store.clear(); }
  };
}

export function createLocalStorageCache({
  namespace = "visual-design",
  ttlMs = 24 * 60 * 60 * 1000,
  storage = globalThis.localStorage
} = {}) {
  if (!storage) throw new Error("localStorage is unavailable; use createMemoryCache instead.");
  const k = key => namespace + ":" + key;
  return {
    get(key) {
      const raw = storage.getItem(k(key));
      if (!raw) return undefined;
      try {
        const item = JSON.parse(raw);
        if (item.expires && item.expires < Date.now()) { storage.removeItem(k(key)); return undefined; }
        return item.value;
      } catch { storage.removeItem(k(key)); return undefined; }
    },
    set(key, value, customTtlMs = ttlMs) {
      storage.setItem(k(key), JSON.stringify({ value, expires:customTtlMs ? Date.now() + customTtlMs : 0 }));
    },
    delete(key) { storage.removeItem(k(key)); },
    clear() {
      for (let i = storage.length - 1; i >= 0; i--) {
        const key = storage.key(i);
        if (key?.startsWith(namespace + ":")) storage.removeItem(key);
      }
    }
  };
}
