class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    if (data && typeof data === 'object') {
      for(let key in data) {
        this.defineReactive(data, key, data[key])
      }
    }
  }
  defineReactive(data, key, value) {
    if (typeof value === 'object') {
      this.observer(value)
    }
    let dep = new Dep()
    Object.defineProperty(data, key, {
      get: () => {
        Dep.target && dep.subscribe(Dep.target)
        return value
      },
      set: newValue => {
        if (newValue !== value) {
          this.observer(newValue)  
          value = newValue
          dep.notify()
          return newValue
        }
      }
    })
  }
}
