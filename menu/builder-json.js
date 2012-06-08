function infoblock(info, elm){
  var div = document.getElementById('block');
  if(!div) {
    var Pdiv = document.createElement("div");
    div = document.createElement("div");
    div.id = 'block';
    div.setAttribute("style","position: absolute; text-align:left; overflow:auto; top: 150px; left: 10px; border: solid 2px gray; background: #ffffff; padding: 10px");
    div.style.position = "absolute";
    div.style.width = "1800px";
    div.style.overflow = "auto";
    div.style.top = "150px";
    div.style.left = "10px";
    div.style.border = "solid 2px gray";
    div.style.background = "#ffffff";
    div.style.padding = "10px";
    Pdiv.appendChild(div);
    var myBody = top.document.getElementsByTagName("body")[0];
    myBody.appendChild(Pdiv);
  }
  
  var vl = "<br/>" + info;
  if(elm) {
    for (x in elm){
      vl += "<br/>" + x;
    }
  }
  div.innerHTML += vl;
}

function DRINK() {
    var drink = {
      drinkname : "",
      desc : "",
      price : "",
      category : ""
    }
    return drink;
}

function buildDrink(cell1, cell2, cat) {
  var drink_ = new DRINK();
  drink_.category = cat;
  var vl1 = cell1.getElementsByTagName('strong')[0];
  if(vl1) {
    drink_.drinkname = String(vl1.innerHTML).trim();
  }
  var vl2 = String(cell1.innerHTML);
  var t = vl2.lastIndexOf('strong>');
  var y = vl2.lastIndexOf('<br>');
  t = (t > y) ? (t+7) : (y + 4);
  drink_.desc = vl2.substring(t).trim();
  
  var price = cell2.getElementsByClassName('price')[0];
  drink_.price = String(price.innerHTML).trim();
  return drink_;
}

function buildJson() {
  var drinks = [];
  var mcotent = document.getElementById('main_content');
  if(mcotent) {
    var img = mcotent.getElementsByTagName('img')[0];
    var src = String(img.src);
    var arr_ = src.split('_');
    var t  = arr_.length;
    if(arr_[t - 3] === 'title') {
      t = t - 2;
    } else if (arr_[t - 2] === 'title') {
      t = t - 1;
    }
    var cat = arr_[t];
    cat = cat.replace('.png', '').replace('.jpg', '');
    var t = 0;
    var tables = mcotent.getElementsByTagName('table');
    if(cat != 'wine' && src.indexOf('sharing_cocktails') < 0) {
      for ( var i = 0; i < tables.length; i++) {
        var table = tables[i];
        var rows = table.rows;
        for ( var j = 0; j < rows.length; j++) {
          var cells = rows[j].cells;
          if(cells.length > 2) {
            drinks[t] = buildDrink(cells[1], cells[2], cat);
          } else {
            drinks[t] = buildDrink(cells[0], cells[1], cat);
          }
          ++t;
        }
      }
    } else if(cat === 'wine') {
      for ( var i = 0; i < tables.length; i++) {
        var table = tables[i];
        var rows = table.rows;
        var drink_ = new DRINK();
        drink_.category = cat;

        var vl1 = rows[0].getElementsByTagName('strong')[0];
        if(vl1) {
          drink_.drinkname = String(vl1.innerHTML).trim();
        }
        var price = rows[0].getElementsByClassName('price')[0];
        drink_.price = String(price.innerHTML).trim();
        var desc = rows[1].cells[0].innerHTML;
        drink_.desc = String(desc).trim();
        drinks[t] = drink_;
        ++t;
      }
    } else if(src.indexOf('sharing_cocktails') > 0){
      for ( var i = 0; i < tables.length; i++) {
        var table = tables[i];
        var rows = table.rows;
        var drink_;
        for ( var j = 0; j < rows.length; j++) {
          if(j%2 == 0) {
            drink_ = new DRINK();
            drink_.category = cat;
            var vl1 = rows[j].getElementsByTagName('strong')[0];
            if(vl1) {
              drink_.drinkname = String(vl1.innerHTML).trim();
            }
            var price = rows[j].getElementsByClassName('price')[0];
            drink_.price = String(price.innerHTML).trim();
          } else {
            var desc = rows[j].cells[0].innerHTML;
            drink_.desc = String(desc).trim();
            drinks[t] = drink_;
            ++t;
          }
        }
      }
    }
  }
  return drinks;
}

function printData() {
  var data = buildJson()
  var vl = String(data.toSource());
  vl = vl.replace(/\\n/ig, '').replace(/\\xA3/ig, '£').replace(/<br>/ig, '')
         .replace(/\\u2019/ig, '’').replace(/\\u201C/ig, '“').replace(/\\u201D/ig, '”')
         .replace(/\\u02BC/ig, 'ʼ').replace(/\\u2013/ig, '–').replace(/\\u2018/ig, '‘')
         .replace(/\[/ig, '[<br>&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\]/ig, '<br>&nbsp;&nbsp;&nbsp;&nbsp;]')
         .replace(/}, {/ig, '},<br>&nbsp;&nbsp;&nbsp;&nbsp;{')
         .replace(/\:\"/ig, '": "')
         .replace(/drinkname\"/ig, '"drinkname"').replace(/desc\"/ig, '"desc"')
         .replace(/price\"/ig, '"price"').replace(/category\"/ig, '"category"');
  infoblock("var objDrink = {\"drinks\": " + vl + "<br>};");
}

setTimeout('printData()', 500);
