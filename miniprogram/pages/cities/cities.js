// pages/cities/cities.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // longitude: this.data.geo.longitude,
    // latitude: this.data.geo.latitude,
    geo: {}, // 城市信息，在返回时，会传递给上一个页面
    cities: [], // 接口请求到的城市列表
    search: '', //搜索的关键字
  },
  // 选定城市
  select(e) {
    let geo = this.data.cities[e.target.dataset.city];
    wx.setStorage({
      key: 'localCity',
      data: geo,
      success:()=>{
        wx.navigateBack();//返回上一级页面
      }
    })
  },
  // 点击搜索按钮
  searchHandle() {
    // console.log(this.data)
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
    wx.showToast({
      title: "正在加载城市"
    })
    wx.cloud.callFunction({
      name: "getCity",
      data: {
        search: this.data.search
      },
      success: (r) => { //请求成功,返回的数据格式是列表
        // console.log('this',this);
        wx.showToast({
          title: "城市搜索成功"
        })
        // 清洗列表，删除cid 不是CN开头的，也就是外国的地区
        let l = r.result;
        let cities = [];
        for (let key of l) {
          if (/^CN\.*/.test(key.cid)) {
            cities.push(key)
          }
        }
        this.setData({
          cities
        })
      },
      fail: (e) => {
        // console.log('城市-搜索失败：', e);
        wx.showToast({
          title: "城市搜索失败"
        })
      }
    })
  },
  onShow: function() {
    // console.log(this.data);
  },
})