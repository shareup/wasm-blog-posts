# Wasm Blog Posts Resources

## adder example

Checkout:

* [`adder.c`](/adder/adder.c)
* [`adder.wat`](/adder/adder.wat)
* [`adder-optimized.wat`](/adder/adder-optimized.wat)
* [`test.html`](/adder/test.html)
* [`test.ts`](/adder/test.ts)

### Serve the `test.html` file

Make sure you have `node` installed. On macOS you can install `node` with `brew`. On other platforms you can checkout the [official install instructions](https://nodejs.org/en/download/).

Then you can run the `serve` package using the `npx` program that comes with `node`:

```sh
$ cd adder
$ npx serve
```

Then you can visit <https://localhost:5000/test.html> and open the console.

## Setup Instructions

### Download the WASI SDK

1. Download the [latest WASI SDK release](https://github.com/WebAssembly/wasi-sdk/releases) for your platform, unzip, and rename the unzipped directory to `wasi-sdk`.
2. Add `wasi-sdk/bin` to the `PATH` of your current shell session:
   `export PATH="$(pwd)/wasi-sdk/bin:$PATH"`
3. Then you should be able to use Clang:
   `clang --version`

### Install the WebAssembly Binary Toolkit

On macOS, you can install `wabt` with `brew`. On other platforms you can [clone and build the repo](https://github.com/WebAssembly/wabt) or use the [online demo](https://webassembly.github.io/wabt/demo/wasm2wat/). You should then have `wasm2wat` in your `PATH`.

