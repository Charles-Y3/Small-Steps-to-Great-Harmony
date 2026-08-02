const STORAGE_KEY = 'ssgh:visited';

export function readVisited(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function markVisited(id: string) {
  try {
    const current = readVisited();
    current[id] = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // localStorage unavailable — the tick just won't persist
  }
}

export function clearVisited() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
