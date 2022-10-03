import {writable} from "svelte/store";
import {buildLocalStore} from "./localStoreFactory.js";

const localstorageKey = 'theme'

function createThemeStore(){
  const options = ['carbon', 'alpine', 'dino']

  const {subscribe, set, update} = buildLocalStore(localstorageKey, options[0])

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
