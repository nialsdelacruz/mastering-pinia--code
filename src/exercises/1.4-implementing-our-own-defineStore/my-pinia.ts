import { effectScope } from "vue"

const stores = new WeakMap<() => unknown, unknown>()
const globalScope = effectScope(true)

export function defineStore<T>(fn: () => T) {
  function useStore() {

    if(!stores.has(fn)) {
      const store = globalScope.run(() => effectScope().run(fn))
      stores.set(fn, store)
    }
    
    return stores.get(fn) as T
  }

  return useStore
}
