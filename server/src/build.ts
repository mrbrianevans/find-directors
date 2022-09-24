/*
Build source files into one-file-per-Function for deployment, bundled with all dependencies etc.
 */
import {mkdir, readdir} from 'fs/promises'
import {resolve,relative,join} from 'node:path'
import {build} from 'esbuild'

const packagesSrcDir = await getPath('./packages')
const packagesOutDir = await getPath('../packages')
const packages = await readdir(packagesSrcDir)
for (const packageName of packages) {
    await mkdir(appendPath(packagesOutDir, packageName), {recursive: true})
    const functions = await readdir(appendPath(packagesSrcDir, packageName))
    for (const functionName of functions) {
        console.time("Wrote "+ packageName+'/'+ functionName)
        const res = await build({
            bundle: true,
            outfile: appendPath(packagesOutDir, packageName, functionName + '.js').pathname.slice(1),
            entryPoints: [appendPath(packagesSrcDir, packageName, functionName , 'index.ts').pathname.slice(1)],
            format: 'cjs', platform: 'node', minify: true
        })
        console.timeEnd("Wrote "+ packageName+'/'+ functionName)
        res.warnings.forEach(console.log)
        res.errors.forEach(console.log)
    }
}


async function getPath(relativePath: string){
    if(import.meta?.resolve) {
        return await import.meta?.resolve(relativePath).then(f => new URL(f))
    }else return relativePath

}
function appendPath(originalUrl: string|URL, ...newSegments: string[]){
    const newPath = join(originalUrl.toString(), ...newSegments)
    return new URL(newPath)
}
