module.exports = {
  isFunction (fn) {
    return typeof fn === 'function'
  },

  isNumber (num) {
    return typeof num === 'number'
  },

  htmlToEl (html) {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.children[0]
  }

}
