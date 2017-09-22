"use strict"
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
  return n.padStart(2, "0");
}

//是否闰年
function isLeapYear(year){
  return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)
}
//返回格式为"YYYY-MM-DD"的字符串
function formatDate(date){
  return date.getFullYear() + "-" + formatNumber(date.getMonth() + 1) + "-" + formatNumber(date.getDate())
}

//返回{year, month, day, ymd} 对象
function formatDate1(year, month, day){
  return {
      year,
      month: formatNumber(month),
      day: formatNumber(day),
      ymd: year + "-" + formatNumber(month) + "-" + formatNumber(day)
    }
}

//通过月份和年份取该月有多少天
function getDaysByMonth(month, year = new Date().getFullYear()){
  if(month > 12) return;
  return month > 7 ? month % 2 == 0 ? 31 : 30 : month % 2 == 1 ? 31 : month != 2 ? 30 : isLeapYear(year) ? 29 : 28;
}

//获取上个月
function getPrevMonth(month, year = new Date().getFullYear()){
  if(Number.isNaN(Number(year)) || Number.isNaN(Number(month))) return;
  return month == 1 ? {year: year - 1, month: 12} : {year: Number(year), month: month - 1};
}

//获取下个月
function getNextMonth(month, year = new Date().getFullYear()){
  if(Number.isNaN(Number(year)) || Number.isNaN(Number(month))) return;
  return month == 12 ? {year: Number(year) + 1, month: 1} : {year: year, month: Number(month) + 1};
}


//通过月份和年份获取返回数组, 长度是当月天数, 单项是格式为"YYYY-MM-DD"的字符串
function getDaysWithMonthYearByMonth(month, year = new Date().getFullYear()){
  let days,
  daysArr;
  days = getDaysByMonth(month, year);
  daysArr = [];
  for(let i = 1; i <= days; i++){
    // daysArr.push(year + "-" + formatNumber(month) + "-" +formatNumber(i));
    daysArr.push(formatDate1(year, month, i));
  }
  return daysArr;
}

//通过月份和年份获取返回数组, 不足 6 行的单项用空字符串补充
function getDaysArrByMonth(month, year = new Date().getFullYear()){
  let rows, //每行 7 天, 6 行总共 42 天
  daysPerWeek,
  firstDay, 
  fullDays,
  daysArr,
  lastDayIndexInWeek,
  fullDays1;
  rows  = 6;
  daysPerWeek = 7;
  daysArr = getDaysWithMonthYearByMonth(month, year);
  firstDay = new Date(year, month - 1).getDay();
  fullDays = new Array(firstDay).fill("");//当月第一天前面补充空字符串
  fullDays.push(...daysArr);
  fullDays1 = new Array(rows * daysPerWeek - fullDays.length).fill("");
  fullDays1.unshift(...fullDays);//当月最后一天前面补充空字符串
  return fullDays1;
}
// 不足 6 行的单项用上个月和下个月的日期补充显示
function getDaysArrWithPrevNextByMonth(month, year = new Date().getFullYear()){
  let rows, //每行 7 天, 6 行总共 42 天
  daysPerWeek,
  firstDay, 
  fullDays,
  daysArr,
  lastDayIndexInWeek,
  fullDays1;
  rows  = 6;
  daysPerWeek = 7;
  daysArr = getDaysWithMonthYearByMonth(month, year);
  firstDay = new Date(year, month - 1).getDay() || daysPerWeek;//如果第一天是周日, 优先补齐上个月的剩余日期
  // let i = firstDay;
  let prevMonth;
  let prevMonthDays;
  let prevMonthPartDays;
  fullDays = [];
  prevMonth = getPrevMonth(month, year);
  prevMonthDays = getDaysByMonth(prevMonth.month, prevMonth.year);
  let _day;
  while(firstDay > 0){//当月第一天前面补充上一个月的
    firstDay--;
    _day = prevMonthDays - firstDay;
    fullDays.push({
      year: prevMonth.year,
      month: formatNumber(prevMonth.month),
      day: formatNumber(_day),
      ymd: prevMonth.year + "-" + formatNumber(prevMonth.month) + "-" + formatNumber(_day),
      isPrevMonth: true
    })
  }
  fullDays.push(...daysArr);
  let nextMonth;
  let nextMonthDays;
  let nextMonthPartDays;
  fullDays1 = [];
  nextMonth = getNextMonth(month, year);
  nextMonthPartDays = rows * daysPerWeek - fullDays.length;
  for(let i = 1; i <= nextMonthPartDays; i++){
    fullDays1.push({
      year: nextMonth.year,
      month: formatNumber(nextMonth.month),
      day: formatNumber(i),
      ymd: nextMonth.year + "-" + formatNumber(nextMonth.month) + "-" + formatNumber(i),
      isNextMonth: true
    });
  }
  // fullDays1 = new Array(sixRowsDays - fullDays.length).fill("");
  fullDays1.unshift(...fullDays);//当月最后一天前面补充空字符串
  return fullDays1;
}
//把日期分割, 返回2维数组, 子数组顺序从周日-周六,
function sliceDays(daysArr){
  let slicedDaysArr = [];
  while(daysArr.length){
    slicedDaysArr.push(daysArr.splice(0, 7));
  }
  return slicedDaysArr;

}






// function selectMonth(month){

// }
// function selectPrevMonth(month){

// }
// function selectNextMonth(month){

// }

module.exports = {
  formatNumber,
  formatTime,
  formatDate,
  formatDate1,
  isLeapYear,
  // getDayMonthYear,
  // getEverydayOfMonth,
  // getFullEverydayOfMonth,
  getDaysArrByMonth,
  getDaysArrWithPrevNextByMonth,
  getPrevMonth,
  getNextMonth,
  sliceDays
}






