import {writable} from "svelte/store";

const localstorageKey = 'theme'

function createThemeStore(){
  const options = ['carbon', 'alpine', 'dino']

  const {subscribe, set: _set, update: _update} = writable(localStorage.getItem(localstorageKey) ?? options[0])
  const set = newValue => {
    localStorage.setItem(localstorageKey, newValue)
    _set(newValue)
  }
  const update = updater => {
    _update(prev=>{
      const newValue = updater(prev)
      localStorage.setItem(localstorageKey, newValue)
      return newValue
    })
  }
  // go to next theme in list
  function toggle(){
    update(prev=>{
      const currIndex = options.indexOf(prev)
      return options[(currIndex + 1) % options.length]
    })
  }

  return {subscribe, options, toggle, set}
}


export const theme = createThemeStore()
