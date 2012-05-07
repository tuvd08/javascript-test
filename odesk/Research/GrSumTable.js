// ==UserScript==
// @Author        Vu Duy Tu
// @name          Sum row of table
// @description   Calculate totals all rows of table have data is number or £ number.
// @include       http://*.terapeak.com/*
// @include       http://*terapeak.com/*
// @include       https://*.terapeak.com/*
// @include       https://*terapeak.com/*
// @version       0.1
//
// ==/UserScript==

var gt = "£";// the unit of money 
var clazz = 'terapeak-table';// the class name of table for calculate sum rows

function roundNumber(num, dec) {
  var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  return result;
}

function DataTable() {
  var info = [0,0,0,0,0,0,0,0,0];
  var table = document.getElementsByClassName(clazz)[0];
  if(table) {
    var tbody = table.getElementsByTagName('tbody')[0];
    var trs = tbody.getElementsByTagName('tr');
    for ( var i = 0; i < trs.length; i++) {
      var tds = trs[i].getElementsByTagName('td');
      for ( var j = 0; j < tds.length; j++) {
        var vl = tds[j].firstChild.nodeValue;
        var isAdd = true;
        if(vl){
          vl = String(vl).replace(gt, "").replace(",", ""); 
          if(vl*1 == vl) {
            info[j] += (vl*1);
            isAdd = false;
          }
        }
        if(isAdd) {
          info[j] += 0;
        }
      }
    }

    try {
      info[7] = info[2] / info[6];
      info[7] = roundNumber(info[7], 2);
    } catch (err) {}

    var row=tbody.insertRow(1);
    for ( var i = 0; i < info.length; i++) {
      var cell=row.insertCell(i);
      cell.setAttribute('align', 'right');
      cell.className = "row";
      if(info[i] > 0) {
        cell.innerHTML ="<strong>" + ((i == 2 || i == 7) ? gt : "") + info[i] + "</strong>";
      } else {
        cell.innerHTML = "";
      }
    }
  }
}

setTimeout('DataTable()', 1000);