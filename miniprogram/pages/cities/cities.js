// pages/cities/cities.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // longitude: this.data.geo.longitude,
    // latitude: this.data.geo.latitude,
    geo: {}, // 城市信息，在返回时，会传递给上一个页面
    cities: [], // 接口请求到的城市列表d
    search: '', //搜索的关键字

  },
  // 点击搜索按钮
  searchHandle() {
    console.log(this.data)
    wx.showToast({
      title: "search"
    })
    this.getCities();
  },
  // input 标签内容改变
  inputHandle(e) {
    this.setData({
      search: e.detail
    })
  },
  // 请求城市接口，拉取城市列表
  getCities() {
    wx.cloud.callFunction({
        name: "getCity",
        data: {
          search: this.data.search
        }
      })
      .then(r => { //请求成功,返回的数据格式是列表
      console.log('请求成功：',r)
        this.setDate({
          cities: r.result
        })
      })
      .catch(e => {})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})