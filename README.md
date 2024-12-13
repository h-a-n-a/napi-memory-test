# NAPI Memory Test

## Build

```
$ pnpm install
$ cd crates/binding
$ pnpm run build
```

## Run

```
$ cd packages/cli
$ node --expose-gc ./bin.js
```
