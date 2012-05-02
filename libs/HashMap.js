function HashMap() {
  var MAP = {
    key : [],
    value : [],
    put : function(k, v) {
      var id = this.indexOfKey(k);
      if (id >= 0) {
        this.value[id] = v;
      } else {
        id = this.size();
        this.key[id] = k;
        this.value[id] = v;
      }
    },
    newMap : function() {
      this.key = [];
      this.value = [];
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
      for ( var i = 0; i < this.size(); ++i) {
        if (key === this.key[i]) {
          return i;
        }
      }
      return -1;
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
    }
  };
  return MAP;
}