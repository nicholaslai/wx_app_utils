let utils = require("../../utils/util");
let selectedDate = "2017-09-20";
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    date: [],
    week: ["日","一","二","三","四","五","六"],
    currentMonth: "",
    selectedDate:"",
    today: "",
    animation: "",
    bgClass: ""
  },
  //事件处理函数
  calendaritemtap: function(e) {
    if(e.target.dataset.disabled) return;
    this.setData({
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

  prevMonth: function () {
    let currentYear = this.data.currentMonth.split("-")[0];
    let currentMonth = this.data.currentMonth.split("-")[1];
    let prevMonth = utils.getPrevMonth(currentMonth, currentYear);
    currentYear = utils.formatNumber(prevMonth.year);
    currentMonth = utils.formatNumber(prevMonth.month);
    let daysArr = utils.getDaysArrWithPrevNextByMonth(prevMonth.month, prevMonth.year);
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
    let daysArr = utils.getDaysArrWithPrevNextByMonth(nextMonth.month, nextMonth.year);
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
    let daysArr = utils.getDaysArrWithPrevNextByMonth(_today.getMonth() + 1, _today.getFullYear());
    let slicedDaysArr = utils.sliceDays(daysArr);

    this.setData({
      selectedDate: selectedDate,
      today: today,
      currentMonth: currentYear + "-" + currentMonth,
      date: slicedDaysArr
    })


  }
})
