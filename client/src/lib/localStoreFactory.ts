import {writable} from "svelte/store"
import type {Updater} from 'svelte/store'
import {getJsonItem, setJsonItem} from "./localStorageUtils.js";

/**
 * Builds a custom svelte store for any data type.
 *
 * - saves and restores state in localStorage.
 *
 * @param key - unique key for this store to be used as localStorage keys.
 * @param defaultValue - the default value to initialise the store with if it's not set in localStorage.
 * @returns store - a svelte store which can be auto-subscribed to with `$store`
 */
export function buildLocalStore<T>(key: string, defaultValue: T) {
  const {set: rawSet, subscribe, update: rawUpdate} = writable<T>(getJsonItem<T>(key, defaultValue))
  const set = (value: T) => {
    setJsonItem(key, value)
    rawSet(value)
  }
  const update = (updater: Updater<T>) => {
    rawUpdate(prevValue => {
      const newValue = updater(prevValue)
      setJsonItem(key, newValue)
      return newValue
    })
  }
  const reset = () => {
    localStorage.removeItem(key)
    set(defaultValue)
  }
  return {update, set, subscribe, reset}
}
