// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lightOn:false,
  },
  // 拍照
  record(){
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality:'high',
      success:(res)=>{
        // 获取临时路径
        //交去rec页面识别
        wx.navigateTo({
          url: `../rec/rec?imgSrc=${res.tempImagePath}`,
        })
      }
    })
  },
  select(){
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
  },
  changeLight(){
    const lightOn = this.data.lightOn
    this.setData({
      lightOn:!lightOn
    })
  }

 
})