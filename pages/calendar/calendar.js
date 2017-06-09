var utils = require("../../utils/util");

// calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myAnimation:"",
    date: [],
    week: ["日","一","二","三","四","五","六"],
  },
  prevMonth: function (e) {
    // body...
    // var _date = this.selectedDateObj;
    var that = this;
    var currentMonth = that.currentMonth;
    currentMonth = utils.getPrevMonth(new Date(currentMonth));
    // var currentYearMonth = e.currentTarget.dataset.prevmonth;
    // var arr = currentYearMonth.split("-");
    // var dayThisMonth = getDays(arr[0], arr[1]);

    that.currentMonth = currentMonth;
    this.setData({
      prevmonth: utils.getPrevMonth(new Date(currentMonth)),
      nextmonth: utils.getNextMonth(new Date(currentMonth)),
      currentMonth: currentMonth,
      today: that.today,
      selectedDate: that.selectedDate,
      date: utils.sliceByWeek(utils.getFullEverydayOfMonth(utils.getEverydayOfMonth(new Date(currentMonth))))
    })

  },
  nextMonth: function (e) {
    // body...
    // var _date = this.selectedDateObj;
    var that = this;
    var currentMonth = that.currentMonth;
    currentMonth = utils.getNextMonth(new Date(currentMonth));
    // var currentYearMonth = e.currentTarget.dataset.prevmonth;
    // var arr = currentYearMonth.split("-");
    // var dayThisMonth = getDays(arr[0], arr[1]);

    that.currentMonth = currentMonth;
    this.setData({
      prevmonth: utils.getPrevMonth(new Date(currentMonth)),
      nextmonth: utils.getNextMonth(new Date(currentMonth)),
      currentMonth: currentMonth,
      today: that.today,
      selectedDate: that.selectedDate,
      date: utils.sliceByWeek(utils.getFullEverydayOfMonth(utils.getEverydayOfMonth(new Date(currentMonth))))
    })

  },
  calendaritemtap:function(e){
    wx.navigateTo({
      url:"/pages/calendar/calendar?date="+e.target.dataset.date
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // var str = "2017-5";
    var now = new Date();
    var selectedDate = (options && options.date)?options.date:utils.getDayMonthYear(now).ymd;
    var selectedDateObj = new Date(selectedDate);
    var that = this;
    that.selectedDateObj = selectedDateObj;
    var currentMonth = utils.getDayMonthYear(selectedDateObj).year + "-" + utils.getDayMonthYear(selectedDateObj).month;
    // var arr = str.split("-");
    // var dayThisMonth = utils.sliceByWeek(utils.getFullEverydayOfMonth(utils.getEverydayOfMonth(selectedDateObj)));
    that.currentMonth = currentMonth;
    that.today = utils.getDayMonthYear(now).ymd;

    this.setData({
      prevmonth: utils.getPrevMonth(selectedDateObj),
      nextmonth: utils.getNextMonth(selectedDateObj),
      selectedDate: selectedDate,
      today: that.today,
      currentMonth: that.currentMonth,
      date: utils.sliceByWeek(utils.getFullEverydayOfMonth(utils.getEverydayOfMonth(currentMonth)))
    })
// var _html = "<div class='tr'>";
// for(var i = 0; i < ["日","一","二","三","四","五","六"].length; i++){
//   _html += '<div class="td">'+ ["日","一","二","三","四","五","六"][i] +'</div>'
// }
// _html += "</div>";
// document.querySelector("#thead").innerHTML = _html;
// _html = "<div class='tr'>";
// for(var i = 0; i < newDayThisMonth.length; i++){
//   if(i>0 && i%7==0){
//     _html += "</div><div class='tr'>";    
//   }
//   // debugger;
//   _html += '<div class="td">'+ (newDayThisMonth[i]?newDayThisMonth[i].split("-")[2]:newDayThisMonth[i]) +'</div>'
// }
// _html += "</div>";
// document.querySelector("#tbody").innerHTML = _html;


    
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