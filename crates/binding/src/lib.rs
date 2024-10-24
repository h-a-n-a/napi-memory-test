#![deny(clippy::all)]

use std::sync::Arc;

use napi::{bindgen_prelude::*, threadsafe_function::ThreadsafeFunction};
use napi_derive::napi;

#[napi]
pub fn hello() {
  println!("Hello, world!");
}

#[napi]
pub struct MemoryTest {
  data: Vec<u8>,
  cb: Arc<ThreadsafeFunction<()>>,
}

impl Drop for MemoryTest {
  fn drop(&mut self) {
    println!("drop");
  }
}

#[napi]
impl MemoryTest {
  #[napi(constructor)]
  pub fn new(env: Env, cb: ThreadsafeFunction<()>) -> Self {
    Self {
      data: vec![1; 4096000],
      cb: Arc::new(cb),
    }
  }
}
