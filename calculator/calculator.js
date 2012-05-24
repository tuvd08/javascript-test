function roundNumber(num, dec) {
  var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  return result;
}

function isExists(obj) {
  return (obj != null && obj != undefined && String(obj).length > 0);
}

function isNumber(src) {
  return (isExists(src) && !isNaN(src * 1) && src * 1 > 0);
}

function isApple() {
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chromium/i))) {
    return true;
  }
  return false;
}

function isDate(src) {
  if (isExists(src)) {
    if (isApple()) {
      return true;
    }
    return (src.constructor == Date || !isNaN(new Date(Date.parse(src)).getDay()))
  }
  return false;
}

function validateInput(param, sms) {
  if (isNumber(param)) {
    return 0;
  }
  return sms;
}

function getDateFormat(dateText) {
  var newDate;
  if (isApple()) {
    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
      newDate = new Date(NaN),
      month, parts = isoExp.exec(dateText);
    if (parts) {
      month = +parts[2];
      newDate.setFullYear(parts[1], month - 1, parts[3]);
      if (month != newDate.getMonth() + 1) {
        newDate.setTime(NaN);
      } else {
        newDate.setHours(0, 0, 0, 0);
      }
    }
  } else {
    newDate = new Date(Date.parse(dateText));
  }
  return newDate;
}

function calculate(v1, v2, v3) {
  var isNB = true;
  var param1 = document.getElementById(v1).value;
  var d1, d2, hs = 0;
  var arr = [0, 0, 0];
  if (isDate(param1)) {
    d1 = getDateFormat(param1);
    isNB = false;
  }
  var param2 = document.getElementById(v2).value;
  if (isDate(param2)) {
    d2 = getDateFormat(param2);
    isNB = false;
  }
  if (isExists(d1) && isExists(d2)) {
    hs = (d2.valueOf() - d1.valueOf()) / (1000 * 60 * 60 * 24);
  } else if (isNB === false) {
    if (isNaN(d1)) {
      arr[0] = 1;
    } else if (isNaN(d1)) {
      arr[1] = 2;
    }
  } else {
    hs = (1 * param2) - (1 * param1);
  }

  var param3 = String(document.getElementById(v3).value).trim();
  arr[2] = validateInput(param3, 3);

  var result = 0;
  if ((arr[0] + arr[1] + arr[2]) == 0 && !isNaN(hs)) {
    var percentaDay = 8.5/365;
    result = param3 * (percentaDay * hs)/100;
    if (!isNaN(result)) {
      result = " £ " + roundNumber(result, 2);
    } else {
      result = "invalid input";
    }
  } else if (!isNaN(hs)) {
    var sms = (arr[0] > 0) ? "Date Payment Became Due" : (arr[1] > 0) ? "Payment Date" : "Invoice Amount";
    result = "Please, enter the field '" + sms + "' invalid input.";
  } else {
    result = "invalid input";
  }
  document.getElementById("result").innerHTML = result;
}
