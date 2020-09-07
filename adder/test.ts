const bytes = await Deno.readFile('./adder-optimized.wasm')
const module = await WebAssembly.compile(bytes)

async function add (a: number, b: number) {
  const instance = await WebAssembly.instantiate(module)
  return instance.exports.add(a, b) as number
}

console.debug(await add(25, 5))
console.debug(await add(2, 3))
