/**
 * Get an item from local storage and parse it to a JavaScript object or return a default value.
 * @param key - the localStorage key where the value is stored in stringified form.
 * @param defaultValue - the default value to return if not found in localStorage.
 */
export function getJsonItem<T extends Record<any, any>>(key: string, defaultValue: T): T{
  const savedValue = localStorage.getItem(key)
  try {
    return savedValue ? <T>JSON.parse(savedValue) : defaultValue
  }catch (e) {
    console.error("Couldn't get item from localStorage. Returning default instead", {key, savedValue})
    return defaultValue
  }
}

/**
 * Sets a value in localStorage, after stringifying it to JSON.
 * @param key - the key to set.
 * @param value - the value to stringify and save in localStorage.
 */
export function setJsonItem<T extends Record<any, any>>(key: string, value: T){
  localStorage.setItem(key, JSON.stringify(value))
}
