// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const axios = require("axios");

// 和风，?location=116.4,39.9&key=c40432efc0c04d24b1aae425830a83a1
let nowUrl = "https://free-api.heweather.net/s6/weather/now";  // 实时
let dayUrl = 'https://free-api.heweather.net/s6/weather/forecast'; // 3-10天
let key = 'c40432efc0c04d24b1aae425830a83a1'; // 秘钥
// 云函数入口函数
exports.main = async (event, context) => {
    // event 传入：latitude,longitude(纬度，请求接口时在前面)
    // rtype:now,day，请求类型
    let url = (event.rtype === 'day')?dayUrl:nowUrl;

    let response = await axios.get(url,{
        params:{
            key,
            location:(event.longitude+','+event.latitude)
        }
    })
    console.log(response);
    // 将接口直接解析，返回 最里层data
    return response.data.HeWeather6;
}