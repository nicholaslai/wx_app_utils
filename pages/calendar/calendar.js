var utils = require("../../utils/util");
let selectedDate = "2017-09-20";
// calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: [],
    week: ["日","一","二","三","四","五","六"],
    currentMonth: "",
    selectedDate:"",
    today: "",
    animation: "",
    bgClass: ""
  },
  calendaritemtap: function(e) {
    if(e.target.dataset.disabled) return;
    this.setData({
      selectedDate: e.target.dataset.date
    })
  },
  prevMonth: function () {
    let currentYear = this.data.currentMonth.split("-")[0];
    let currentMonth = this.data.currentMonth.split("-")[1];
    let prevMonth = utils.getPrevMonth(currentMonth, currentYear);
    currentYear = utils.formatNumber(prevMonth.year);
    currentMonth = utils.formatNumber(prevMonth.month);
    let daysArr = utils.getDaysArrByMonth(prevMonth.month, prevMonth.year);
    let slicedDaysArr = utils.sliceDays(daysArr);
    this.setData({
      currentMonth: currentYear + "-" + currentMonth,
      date: slicedDaysArr
    })
  },
  nextMonth: function () {
    let currentYear = this.data.currentMonth.split("-")[0];
    let currentMonth = this.data.currentMonth.split("-")[1];
    let nextMonth = utils.getNextMonth(currentMonth, currentYear);
    currentYear = utils.formatNumber(nextMonth.year);
    currentMonth = utils.formatNumber(nextMonth.month);
    let daysArr = utils.getDaysArrByMonth(nextMonth.month, nextMonth.year);
    let slicedDaysArr = utils.sliceDays(daysArr);
    this.setData({
      currentMonth: currentYear + "-" + currentMonth,
      date: slicedDaysArr
    })
  },

  onLoad: function () {
    let _today = new Date();
    let today = utils.formatDate(_today);
    let currentYear = _today.getFullYear();
    let currentMonth = utils.formatNumber(Number(_today.getMonth()) + 1);
    let daysArr = utils.getDaysArrByMonth(_today.getMonth() + 1, _today.getFullYear());
    let slicedDaysArr = utils.sliceDays(daysArr);
    this.setData({
      selectedDate: selectedDate,
      today: today,
      currentMonth: currentYear + "-" + currentMonth,
      date: slicedDaysArr
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