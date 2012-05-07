/**
 * This is about <code>HashMap.js</code>.
 * @author Vu Duy Tu
 * @email duytucntt@gmail.com
 * @date May 2, 2012 2:44:52 PM
 * 
*/

function HashMap() {
  var MAP = {
    key : [],
    value : [],
    put : function(k, v) {
      var id = this.indexOfKey(k);
      if (id >= 0) {
        this.value[id] = v;
      } else {
        this.key.push(k);
        this.value.push(v);
      }
    },
    clear : function() {
      this.key = [];
      this.value = [];
    },
    remove : function(oj) {
      var id = this.indexOfKey(oj);
      if(id >= 0) {
        this.key.splice(id);
        this.value.splice(id);
      }
    },
    keys : function() {
      return this.key;
    },
    values : function() {
      return this.value;
    },
    size : function() {
      return this.key.length;
    },
    indexOfKey : function(key) {
      return this.key.indexOf(key);
    },
    containsKey : function(key) {
      for ( var i = 0; i < this.size(); ++i) {
        if (key === this.key[i]) {
          return true;
        }
      }
      return false;
    },
    get : function(oj) {
      if (typeof oj === "number" && this.indexOfKey(oj) >= 0) {
        return this.value[oj];
      } else if (this.containsKey(oj)) {
        var i = this.indexOfKey(oj);
        if (i >= 0) {
          return this.value[i];
        }
      }
      return "";
    },
    getKey : function(i) {
      if (i < this.size()) {
        return this.key[i];
      }
      return "";
    },
    getValue : function(i) {
      if (i < this.size()) {
        return this.value[i];
      }
      return "";
    }, 
    valueJoins: function() {
      return this.value.join();
    },
    keyJoins : function() {
      return this.key.join();
    }
  };
  return MAP;
}