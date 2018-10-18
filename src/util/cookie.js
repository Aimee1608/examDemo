const getCookie = (name) => {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr && arr.length > 0) {
      return unescape(arr[2])
    } else {
      return null
    }
  }
  export {
    getCookie
  }
