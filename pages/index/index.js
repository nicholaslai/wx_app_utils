var utils = require("../../utils/util");

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    date: [],
    week: ["日","一","二","三","四","五","六"],
  },
  //事件处理函数
  calendaritemtap: function(e) {
    var animation = wx.createAnimation({
      duration: 120,
    })
    animation.translateY("100%").step();
    this.setData({
      animation: animation,
      bgClass: "",
      selectedDate: e.target.dataset.date
    })
  },
  showcalendar: function(){
    var animation = wx.createAnimation({
      duration: 120,
    })
    animation.translateY("-100%").step();
    this.setData({
      animation: animation,
      bgClass: "bg"
    })
  },
  
  closecalendar: function(){
    var animation = wx.createAnimation({
      duration: 120,
    })
    animation.translateY("100%").step();
    this.setData({
      animation: animation,
      bgClass: ""
    })
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

  onLoad: function () {
    // var str = "2017-5";
    var now = new Date();
    var selectedDate = utils.getDayMonthYear(now).ymd;
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


  }
})
