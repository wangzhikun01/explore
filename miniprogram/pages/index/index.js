//index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hour_wd: "关注天气，更关心你", // 按小时，来进行问候
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
  /**
   * 主动定位当前所在地，顺便清除缓存
   */
  newLocal() {
    console.log('删除缓存，重新定位')
    wx.removeStorage({
      key: 'localCity',
      success: (res) =>{
        this.getGeoInfo();
      },
    })
  },
  // 搜索城市页面
  searchCity() {
    wx.navigateTo({
      url: '/pages/cities/cities'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getGeoInfo();
  },
  /**
   * 获取当前位置
   */
  getGeoInfo() {
    // 判断本地存储中，已经存了city信息
    let city;
    try {
      city = wx.getStorageSync("localCity");
    } catch (e) {
      console.log('本地缓存读取失败');
      city = null;
    }
    // 根据是否有缓存，来获取请求天气用的 geo 信息
    if (city) { // 请求缓存中的城市信息
      console.log('缓存中有上次的城市数据');
      let geo = {
        longitude: city.lon,
        latitude: city.lat,
      }
      this.setData({
        geo
      })
      this.getWeatherMsg();
      this.getWeatherMsg('day');
    } else { // 缓存中没有城市，根据wx 定位请求天气信息
      console.log('缓存中没有上次的城市数据');
      wx.getLocation({ // 获取位置
        success: (res) => {
          this.setData({
            geo: res
          });
          this.getWeatherMsg();
          this.getWeatherMsg('day');
        }
      })
    }
  },
  /**
   * 从服务端获取天气信息的函数
   */
  getWeatherMsg(rtype) {
    // console.log('获取温度')
    wx.cloud.callFunction({
      name: "weather",
      data: {
        longitude: this.data.geo.longitude,
        latitude: this.data.geo.latitude,
        rtype,
      }
    }).then(r => {
      // console.log('获取天气的类型：', rtype, r);
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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 展示时刷新页面天气
    this.getGeoInfo();
    // 刷新问候语
    let hour = new Date().getHours();
    let m;
    if (hour <= 3 || hour >= 22) { // 熬夜
      m = '熬夜写代码，会导致第二天精神憔悴哦~'
    } else if (hour > 3 && hour <= 5) { // 凌晨
      m = '你也想看看凌晨的洛杉矶吗？'
    } else if (hour > 5 && hour <= 7) { // 清晨
      m = '早起的鸟儿有虫吃，快去吃个油条，喝完豆腐脑吧'
    } else if (hour > 7 && hour <= 10) { // 上午
      m = '上午工作起来神清气爽，我当公司是我家'
    } else if (hour > 10 && hour <= 13) { // 中午，午饭，午休
      m = '来和妲己一起玩耍吗？'
    } else if (hour > 13 && hour <= 17) { // 下午
      m = '我不管，我要喝手磨咖啡'
    } else if (hour > 17 && hour <= 18) { // 晚饭
      m = 'emmm……吃完饭去哪儿看电影呢？'
    } else if (hour > 18 && hour < 22) { //黄金时间
      m = '约会被拒绝了，还是在家老老实实看新闻联播吧'
    } else { // 使用默认语句，不做修改
      m = '关注天气，更关心你'
    }
    this.setData({
      hour_wd: m
    })

  },
})