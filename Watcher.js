class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr 
    this.cb = cb
    // 默认先存一个老值
    this.oldValue = this.getVal()
  }
  getVal() {
    Dep.target = this
    let value = CompileUtil.getVal(this.expr, this.vm)
    Dep.target = null
    return value
  }
  update() { 
    let newValue = CompileUtil.getVal(this.expr, this.vm)
    if (newValue !== this.oldValue) {
      this.cb(newValue) 
    }
  }
}
