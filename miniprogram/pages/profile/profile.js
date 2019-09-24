// pages/profile/profile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 用户个人授权，然后获取当前位置
        wx.authorize({
            scope: "scope.userInfo",
            success: () => { /**地理位置获取成功 */
                wx.getLocation({
                    success: (r) => { // 获取地理位置成功，返回结果，r
                        this.setData({
                            get: r
                        })
                    }
                })
            },
            fail() {
                wx.showToast({
                    title: "获取地理位置失败"
                })
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})