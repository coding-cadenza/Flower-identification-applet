// pages/rec/rec.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    inRec: true, // 是否正在识别中
    details: {},
    err: false, // 是否展示错误页面
    showRecord:true,// 出错的时候不展示record
    errMsg: '', // 错误消息
    list_data: [{
        title: '花卉简介',
        iconClass: 'icon-huaduo',
        content: '',
      },
      {
        title: '分布区域',
        iconClass: 'icon-quyu',
        content: '',
      }, {
        title: '功能作用',
        iconClass: 'icon-gongnengdingyi',
        content: '',
      }
    ]
  },
  onLoad(option) {
    this.setData({
      imgSrc: option.imgSrc
    })
    const that = this
    // 发请求拿数据
    wx.uploadFile({
      name: 'img',
      filePath: this.data.imgSrc,
      url: 'http://10.128.16.248:5000/flower/predict',
      formData: {
        'set': 1,
      },

      success(res) {
        if (res.statusCode != 200) {
          that.setData({
            err: true,
            showRecord:false,
            errMsg: '小程序出现了点小问题！',
            inRec: false,
          })
        } else {
          const details = JSON.parse(res.data)

          if (JSON.stringify(details) === '{}') {
            that.setData({
              err: true,
              errMsg: '暂时无法识别',
              inRec: false,
            })
          } else {
            // 成功
            that.setData({
              details: details,
              inRec: false,
              'list_data[0].content': details.intro,
              'list_data[1].content': details.fields,
              'list_data[2].content': details.func,
            })
          }
        }
      },
      fail(e) {
        that.setData({
          err: true,
          showRecord:false,
          errMsg: '小程序出现了点小问题！',
          inRec: false,
        })
      }
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  goOut(){
    wx.navigateTo({
      url: `../out/out?url=${this.data.details.url}`,
    })
   
    }
})