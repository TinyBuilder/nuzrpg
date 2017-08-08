extern crate iron;
extern crate staticfile;
extern crate mount;

use iron::prelude::*;
use staticfile::Static;
use mount::Mount;

fn main() {
    let mut mount = Mount::new();
    mount.mount("/", Static::new("index.html"));
    mount.mount("/dist/", Static::new("dist/"));
    Iron::new(mount).http("127.0.0.1:3000").unwrap();
}
