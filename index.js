class Vue {
  constructor(options) {
    this.$options = options 
    let computed = options.computed
    let methods =options.methods
    this.$el = this.$options.el 
    this.$data = this.$options.data
    // 添加计算属性
    for (let key in computed) {
      Object.defineProperty(this.$data, key, {
        get: () => {
          return computed[key].call(this)
        }
      })
    }
    // 添加methods
    for (let key in methods) {
      Object.defineProperty(this, key, {
        get: () => {
          return methods[key]
        }
      })
    }
    if (this.$el) {
      new Observer(this.$data)
      this.proxyData(this.$data)
      new Compiler(this.$el, this)
    }
  }
  // 把this上get的属性添加到this.$data上
  proxyData(data) {
    for(let key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newValue) {
          data[key] = newValue
        }
      })
    }
  }
}


