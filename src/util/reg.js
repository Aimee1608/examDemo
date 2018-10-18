const getRegFun = (cont) => {
    var patternImg = /src=([\s\S]*?)>/g
    var patternJpg = /x(\d+)(.jpg|.png)/g // x647.jpg
    var patternNum = /\d+/g // 647
    var str = cont
    // 改变图片原始尺寸 分辨率过低
    // str = str.replace(patternJpg, function (item) {
    //     if (item.match(patternNum)[0]) {
    //         var oldsize = item.match(patternNum)[0] // 647
    //         var resize = Math.round(parseInt(oldsize) * 0.3) // 145
    //         var newJpg = item.replace(/\d+/g, resize)
    //         // console.log(oldsize, resize)
    //         return newJpg
    //     } 
    //     return item
    // })
    // 改变img 大小 不改变图片原始尺寸
    str = str.replace(patternImg, (item) => { // 'src="https://mr.xesimg.com/test_library/img/2018/05/14/t_1788340_a5-4_2714x697.png?1526263440">'
        if (item.match(patternJpg) && item.match(patternJpg).length > 0) {
            var jpg = item.match(patternJpg)[0] // x647.jpg
            if (jpg.match(patternNum) && jpg.match(patternNum).length > 0) {
                var oldsize = jpg.match(patternNum)[0] // 647
                var resize = Math.round(parseInt(oldsize) * 0.28) // 145
                if (resize || resize > 0) {
                    var height = `height="${resize}px" ` // height="145px"
                    return height + item // height="145px" src="https://mr.xesimg.com/test_library/img/2018/05/14/t_1788340_a5-4_2714x697.png?1526263440">
                }
            }
        }
        return item      
    })
    return str
  }
  export {
    getRegFun
  }
