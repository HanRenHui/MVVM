var CompileUtil = {
  getVal(value, vm) {
    value = value.split('.').reduce((current, key) => {
      return current[key]
    }, vm.$data)
    return value
  },
  // pseron.age
  setValue(expr, vm, value) {
    let keyArr = expr.split('.')
    let oldValue = keyArr.slice(0, -1).reduce((current, key) => {
      return current[key]
    }, vm.$data)
    oldValue[keyArr[keyArr.length-1]] = value
  },
  /**
   * 
   * @param {*} element 
   * @param {*} value : person.name
   * @param {*} vm 
   */
  model(element, value, vm) {
    new Watcher(vm, value, () => {
      // 数据更新 触发此方法 重新渲染视图
      element.value = this.getVal(value, vm)
    })
    element.value = this.getVal(value, vm)

    element.addEventListener('input', e => {
      // console.log(e.target.value);
      CompileUtil.setValue(value, vm, e.target.value)
      
    })
  },
  getContentVal(vm, content) {
        
    return content.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(args[1].trim(), vm)
    })
  },
  text(element, content, vm) {
    newcontent = content.replace(/\{\{(.+?)\}\}/g, (...args) => {
      new Watcher(vm, args[1].trim(), newValue => {
        // 给每个大括号里的内容都加上观察者
        element.textContent = this.getContentVal(vm, content)
      })
      return this.getVal(args[1].trim(), vm)
    })
    element.textContent = newcontent
  },
  on(element, content, vm, eventName) {
    element.addEventListener(eventName, e => {
      vm[content](e)
    })
  }
}
