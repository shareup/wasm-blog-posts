type Exports = {
  memory: WebAssembly.Memory
  allocate_reverse(length: number): number
  reverse(pointers: number): number
  free_reverse(pointers: number): number
}

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const originalString = Deno.args.join(' ')
const originalBytes = encoder.encode(originalString)

const code = await Deno.readFile('reverse.wasm')
const { instance } = await WebAssembly.instantiate(code)
const ex = instance.exports as Exports
const memory = ex.memory

const pointers = ex.allocate_reverse(originalBytes.byteLength)
const view = new DataView(memory.buffer, pointers, 12) // 3 32bit integers is 3 * 4
const storedLengthPointer = view.getUint32(0, true)
const originalPointer = view.getUint32(4, true)
const reversedPointer = view.getUint32(8, true)
const storedLength = (new DataView(memory.buffer, storedLengthPointer, 4)).getUint32(0, true)

if (storedLength !== originalBytes.byteLength) {
  console.error('Wrong storedLength, something has gone wrong')
  Deno.exit(1)
}

const wasmOriginalBytes = new Uint8Array(memory.buffer, originalPointer, storedLength)
wasmOriginalBytes.set(originalBytes)

if (ex.reverse(pointers) !== 0) {
  console.error('reverse failed')
  Deno.exit(1)
}

const reversedBytes = Uint8Array.from(new Uint8Array(memory.buffer, reversedPointer, storedLength))

if (ex.free_reverse(pointers) !== 0) {
  console.error('free_reverse failed')
  Deno.exit(1)
}

console.log(`Original: ${originalString}`)
console.log(`Reversed: ${decoder.decode(reversedBytes)}`)
