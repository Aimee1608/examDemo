export const localStorage = {
  setItem (key, data = {}) {
    window.localStorage.setItem(key, JSON.stringify(data))
  },
  getItem (key) {
    const data = window.localStorage.getItem(key)
    try {
      return JSON.parse(data) || {}
    } catch (e) {
      return data || {}
    }
  },
  removeItem (key) {
    return window.localStorage.removeItem(key)
  },
  updateItem (key, data = {}) {
    return localStorage.setItem(key, Object.assign(localStorage.getItem(key), data))
  },
  clear () {
    return window.localStorage.clear()
  },
  key (index) {
    return window.localStorage.key(index)
  }
}

export const sessionStorage = {
  setItem (key, data = {}) {
    window.sessionStorage.setItem(key, JSON.stringify(data))
  },
  getItem (key) {
    const data = window.sessionStorage.getItem(key)
    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  },
  removeItem (key) {
    return window.sessionStorage.removeItem(key)
  },
  clear () {
    return window.sessionStorage.clear()
  },
  key (index) {
    return window.sessionStorage.key(index)
  }
}
