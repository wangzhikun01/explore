// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let axios = require('axios')
let key = 'c40432efc0c04d24b1aae425830a83a1';
let url = 'https://search.heweather.net/find'
// 云函数入口函数
exports.main = async (event, context) => {
  // 查询的关键字: event.search
  let location = event.search || '北京'
  let result = await axios.get(url,{params:{
    location,
    key,
  }})
  return result.data.HeWeather6[0]
}