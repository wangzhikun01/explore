//index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    geo: {}, // 地理位置对象
    msg: { // 天气信息,填充默认值
      "basic": {
        "cid": "CN101011600",
        "location": "东城",
        "parent_city": "北京",
        "admin_area": "北京",
        "cnty": "中国",
        "lat": "39.91754532",
        "lon": "116.41875458",
        "tz": "+8.00"
      },
      "update": {
        "loc": "2019-09-20 19:12",
        "utc": "2019-09-20 11:12"
      },
      "status": "ok",
      "now": {
        "cloud": "91",
        "cond_code": "101",
        "cond_txt": "多云",
        "fl": "25",
        "hum": "53",
        "pcpn": "0.0",
        "pres": "1012",
        "tmp": "24",
        "vis": "16",
        "wind_deg": "173",
        "wind_dir": "南风",
        "wind_sc": "1",
        "wind_spd": "4"
      }

    },
    search: "", // 所有其他的城市
    dayMsg: { // 往后 3天的天气预报
      "basic": {
        "cid": "CN101011600",
        "location": "东城",
        "parent_city": "北京",
        "admin_area": "北京",
        "cnty": "中国",
        "lat": "39.91754532",
        "lon": "116.41875458",
        "tz": "+8.00"
      },
      "update": {
        "loc": "2019-09-21 21:56",
        "utc": "2019-09-21 13:56"
      },
      "status": "ok",
      "daily_forecast": [{
          "cond_code_d": "101",
          "cond_code_n": "100",
          "cond_txt_d": "多云",
          "cond_txt_n": "晴",
          "date": "2019-09-21",
          "hum": "59",
          "mr": "22:24",
          "ms": "12:30",
          "pcpn": "0.0",
          "pop": "0",
          "pres": "1018",
          "sr": "06:01",
          "ss": "18:11",
          "tmp_max": "28",
          "tmp_min": "16",
          "uv_index": "4",
          "vis": "25",
          "wind_deg": "178",
          "wind_dir": "南风",
          "wind_sc": "1-2",
          "wind_spd": "7"
        },
        {
          "cond_code_d": "100",
          "cond_code_n": "100",
          "cond_txt_d": "晴",
          "cond_txt_n": "晴",
          "date": "2019-09-22",
          "hum": "57",
          "mr": "23:14",
          "ms": "13:32",
          "pcpn": "0.0",
          "pop": "2",
          "pres": "1014",
          "sr": "06:02",
          "ss": "18:10",
          "tmp_max": "27",
          "tmp_min": "16",
          "uv_index": "9",
          "vis": "25",
          "wind_deg": "352",
          "wind_dir": "北风",
          "wind_sc": "1-2",
          "wind_spd": "9"
        },
        {
          "cond_code_d": "100",
          "cond_code_n": "100",
          "cond_txt_d": "晴",
          "cond_txt_n": "晴",
          "date": "2019-09-23",
          "hum": "31",
          "mr": "00:00",
          "ms": "14:30",
          "pcpn": "0.0",
          "pop": "0",
          "pres": "1015",
          "sr": "06:03",
          "ss": "18:08",
          "tmp_max": "30",
          "tmp_min": "17",
          "uv_index": "10",
          "vis": "25",
          "wind_deg": "6",
          "wind_dir": "北风",
          "wind_sc": "1-2",
          "wind_spd": "2"
        }
      ]
    }

  },
  // 搜索城市页面
  searchCity(){
    wx.navigateTo({
      url:'/pages/cities/cities'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.get) {
      console.log('页面加载时，传入 geo');
    } else {
      console.log('页面加载时未传入 geo');
      wx.getLocation({ // 获取位置
        success: (res) => {
          this.setData({
            geo: res
          });
          this.getWeatherMsg();
          this.getWeatherMsg('day')
        }
      })
    }

  },
  /**
   * 从服务端获取天气信息的函数
   */
  getWeatherMsg(rtype) {
    console.log('获取温度')
    wx.cloud.callFunction({
      name: "weather",
      data: {
        longitude: this.data.geo.longitude,
        latitude: this.data.geo.latitude,
        rtype,
      }
    }).then(r => {
      console.log('获取天气的类型：', rtype, r);
      if (rtype) { // rtype进行了传入，预期是获取三天的预告
        this.setData({
          dayMsg: (r.result)[0]
        })
      } else {
        this.setData({
          msg: (r.result)[0]
        })
      }
    })
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
    // 展示时刷新页面天气
    // 如果是从城市搜索页面回来的，则会更新本业geo对象，刷新为新的地区
    this.getWeatherMsg();
    this.getWeatherMsg('day')
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