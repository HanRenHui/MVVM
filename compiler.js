class Compiler {
  constructor(el, vm) {
    
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    // 将dom节点存放到内存当中
    this.fragment = this.nodeToFragment(this.el)
    this.vm= vm
    // 对dom中的数据进行编译
    this.compile(this.fragment)
    // 将编译完的数据重新塞回去
    this.el.appendChild(this.fragment)
  }
  isElementNode(node) {
    return node.nodeType === 1
  }
  compileElement(element) {
    let attrs = [...element.attributes]
    attrs.forEach(attr => { // attr是个对象 
      let {name, value} = attr   // name v-module value person.age
      // 看看是不是v-指令
      if (this.isDirective(name)) {
        let [, directive] = name.split('-')
        let [directiveName, eventName] = directive.split(':')
        CompileUtil[directiveName](element, value, this.vm, eventName)
      } 
    })
  }
  compileText(element) { // 文本节点 则检查包不包含{{}}
    let content = element.textContent 
    if (/\{\{(.+?)\}\}/.test(content)) {
      // content.replace(/\{\{(.+?)\}\}/g, (...args) => {
        CompileUtil['text'](element, content, this.vm)
      // })
    }
  }

  isDirective(key) {
    return key.startsWith('v-')
  }
  /**
   * 用来编译内存中的dom节点
   * @param {} fragment 
   */
  compile(fragment) {
    let childNodes = fragment.childNodes
    ;[...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        // 是元素节点
        this.compileElement(child)
        // 递归遍历
        this.compile(child)
      } else {
        // 是文本节点
        this.compileText(child)
      }
    })
    
  }
  // 把真实的结点放到内存当中
  nodeToFragment(node) {
    let fragment = document.createDocumentFragment()
    let child 
    while(child = node.firstChild) {
      fragment.append(child)
    }
    return fragment
  }
}


