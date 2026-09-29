export function createServerMemoryCache({ maxEntries = 250, ttlMs = 60 * 60 * 1000 } = {}) {
  const store = new Map();
  return {
    async get(key) {
      const hit = store.get(key);
      if (!hit) return undefined;
      if (hit.expires && hit.expires < Date.now()) { store.delete(key); return undefined; }
      return hit.value;
    },
    async set(key, value, customTtlMs = ttlMs) {
      if (store.size >= maxEntries) store.delete(store.keys().next().value);
      store.set(key, { value, expires:customTtlMs ? Date.now() + customTtlMs : 0 });
    },
    async delete(key) { store.delete(key); }
  };
}
