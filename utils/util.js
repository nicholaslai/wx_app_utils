function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//是否闰年
function isLeapYear(year){
  if(year%400==0 || (year%4==0 && year%100!=0)){
    return true;
  }
  return false;
}
//返回日期的年，月，日
function getDayMonthYear(date){
  var year = date.getFullYear();
  var month = formatNumber(date.getMonth() + 1);
  var day = formatNumber(date.getDate());
  return {
    ymd: year + "-" + month + "-" + day,
    year: year,
    month: month,
    day: day
  }
}
//获取一个月的的每一天
function getEverydayOfMonth(date, today){
  var date = new Date(date);
  var daysEveryMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var dayArr = [];
  if(isLeapYear(getDayMonthYear(date).year)){
    daysEveryMonth[1] = 29;
  }
  var currentDate = getDayMonthYear(date);
  for(var i = 0; i < daysEveryMonth[currentDate.month-1]; i++){
    // dayArr.push([currentDate.year, currentDate.month, formatNumber(i+1)].join("-"));
    var everyday = new Date([currentDate.year, currentDate.month, formatNumber(i+1)].join("-"));
    dayArr.push(getDayMonthYear(everyday));
  }
  return dayArr;
}
//获取一个月中的每一天
function getFullEverydayOfMonth(dayArr){
  var startDay = (new Date(dayArr[0].ymd)).getDay();
  var endDay = (new Date(dayArr[dayArr.length-1].ymd)).getDay();
  var newDayArr = dayArr.slice(0);
  for(var i = 0; i < startDay; i++){//第一天不是周日的话，该周剩余天数用""代替
    newDayArr.unshift("");
  }
  if(endDay != 6){//最后一天不是周六的话，该周剩余天数用""代替
    for(var i = endDay + 1; i < 7; i++){
      newDayArr.push("");
    }
  }
  return newDayArr;
}
//把日期按照切割，返回数组，数组的单项也是数组，单项的单项顺序从周日-周六
function sliceByWeek(dayarr){
  var dayArrByWeek = [];
  var len = dayarr.length/7;
  for(var i = 0; i < len; i++){
    dayArrByWeek.push(dayarr.splice(0, 7));
  }
  return dayArrByWeek;
}

//获取上个月
function getPrevMonth(date){
  var month = getDayMonthYear(date).month;
  var year = getDayMonthYear(date).year;
  return month == 1 ? ((Number(year) - 1) + "-" + 12) : (year + "-" + formatNumber((Number(month) - 1)));
}
//获取下个月
function getNextMonth(date){
  var month = getDayMonthYear(date).month;
  var year = getDayMonthYear(date).year;
  return month == 12 ? ((Number(year) + 1) + "-0" + 1) : (year + "-" + formatNumber((Number(month) + 1)));
}

module.exports = {
  formatTime: formatTime,
  isLeapYear: isLeapYear,
  getDayMonthYear: getDayMonthYear,
  getEverydayOfMonth: getEverydayOfMonth,
  getFullEverydayOfMonth: getFullEverydayOfMonth,
  getPrevMonth: getPrevMonth,
  getNextMonth: getNextMonth,
  sliceByWeek: sliceByWeek
}






