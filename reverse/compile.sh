#!/usr/bin/env bash

set -eo pipefail

export PROJECT="$(cd $(dirname $0)/.. && pwd)"
export PATH="$(cd $PROJECT/wasi-sdk/bin && pwd):$PATH"
export WASI_SYSROOT="$(cd $PROJECT/wasi-sdk/share/wasi-sysroot && pwd)"

clang --target=wasm32-wasi --sysroot="${WASI_SYSROOT}" -Oz -flto -Wl,--lto-O3 -o reverse.wasm reverse.c

wasm2wat reverse.wasm -o reverse.wat
