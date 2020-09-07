#!/usr/bin/env bash

set -eo pipefail

export PROJECT="$(cd $(dirname $0)/.. && pwd)"
export PATH="$(cd $PROJECT/wasi-sdk/bin && pwd):$PATH"

clang --target=wasm32 -nostdlib -Wl,--no-entry -o adder.wasm adder.c

wasm2wat adder.wasm -o adder.wat

# -*- optimized -*-

clang --target=wasm32 -Oz -flto -nostdlib -Wl,--no-entry -Wl,--lto-O3 -o adder-optimized.wasm adder.c

wasm2wat adder-optimized.wasm -o adder-optimized.wat
