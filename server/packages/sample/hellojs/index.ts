import camelcase from "camelcase";

function main(args) {
    let name = args.name || 'stranger'
    let greeting = 'Hello ' + camelcase(name) + '!' + ' (from TypeScript)'
    console.log(greeting)
    return {"body": greeting}
  }

export {main}
