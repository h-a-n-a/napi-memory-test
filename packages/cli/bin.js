import { MemoryTest } from 'binding'

class Compiler {}

function test1() {
  let compiler = new Compiler()
  let c = new WeakRef(compiler)
  compiler.memoryTest = new MemoryTest(() => c)
}

function test2() {
  let compiler = new Compiler()
  compiler.memoryTest = new MemoryTest(() => compiler)
}

function test3() {
  let memoryTest = new MemoryTest(() => memoryTest)
}

function test4() {
  let compiler = new Compiler()
  compiler.memoryTest = new MemoryTest(() => compiler)
  compiler.memoryTest = null
}

function test5() {
  let compiler = new Compiler()
  let c = new WeakRef(compiler)
  compiler.memoryTest = new MemoryTest(() => c)
  compiler.memoryTest = null
}

// Running test
const run = test2

/////////////////////////////////////////////////////////////////////////////////
// DO NOT CHANGE THE CODE BELOW
/////////////////////////////////////////////////////////////////////////////////

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function iter() {
  let i = 1000
  let group = 100
  while (i--) {
    run()
    console.log(`${process.memoryUsage().rss / 1024 / 1024} MB`)
    if (group-- === 0) {
      gc()
      group = 100
      await sleep(500)
    }
  }
  await iter()
}

iter()
