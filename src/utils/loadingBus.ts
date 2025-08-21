// A simple global loading event bus to coordinate loading state across non-React modules (e.g., axios)
// and React components.

type Listener = (count: number) => void;

let count = 0;
const listeners = new Set<Listener>();

function notify() {
  for (const fn of listeners) fn(count);
}

export const loadingBus = {
  start() {
    count += 1;
    notify();
  },
  stop() {
    count = Math.max(0, count - 1);
    notify();
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    // Immediately provide current state
    fn(count);
    return () => listeners.delete(fn);
  },
  getCount() {
    return count;
  },
};
