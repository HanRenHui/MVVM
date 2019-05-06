class Dep {
  constructor() {
    this.subs = []
  }
  subscribe(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(w => w.update())
  }
}

