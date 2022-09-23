function main(args) {
    let name = args.name || 'stranger'
    let greeting = 'Hello ' + name + '!' + ' (from TypeScript)'
    console.log(greeting)
    return {"body": greeting}
  }

