
function checkExisting() {
    var file = String(document.getElementById('url').value);
    if(file && file.length > 0){

      var fso = null;
      var exits = false;
      if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari

          try {
          fso = new XMLHttpRequest();
          fso.open('HEAD', file, false);
          fso.send();
          if(fso.status == 200) {
             exits = true;
          }
        } catch (e) {
        }
      } else {// code for IE6, IE5
        fso = new ActiveXObject("Scripting.FileSystemObject");
        exits = fso.FileExists(file)
      }

      if (exits) {  
          alert("The file " + file + " exists.");  
      } else {  
          alert("The file " + file + " does not exist.");  
      }  
    
      fso = null;  
    } else {
      alert("Please, enter the url in text box for test..");
    }
}
