// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    cover:'https://7072-prod-4gff7pd478a59585-1317819615.tcb.qcloud.la/8.jpg?sign=670d313ce5f118c9ca6008c4f0e2bd3e&t=1681747483',
    imgSrc:'',
  },
  goToRec(){
    wx.navigateTo({
      url: '../record/record',
    })
  },
  // 选择图片
  selectPhoto(){
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      sourceType:['album'],
      success(res) {
        const img = res.tempFiles[0].tempFilePath
        wx.navigateTo({
          url: `../rec/rec?imgSrc=${img}`,
        })
      }
    })
}
})
