<!DOCTYPE html>
<html>
  
  <head>
    <title>Contact Form</title>
    <!-- Meta Tags -->
    <meta charset="utf-8">
    <meta name="generator" content="Wufoo">
    <meta name="robots" content="index, follow">
    <!-- CSS -->
    <link href="css/structure.css" rel="stylesheet">
    <link href="css/form.css" rel="stylesheet">
    <!-- JavaScript -->
    <script src="scripts/wufoo.js"></script>
  </head>
  
  <body id="public">
    <div id="container" class="ltr">
      <h1 id="logo">
        <a href="http://svbuichu.com" title="Contact us.">Contact us</a>
      </h1>
      <form id="form27" name="form27" class="wufoo  page" autocomplete="off" enctype="multipart/form-data" method="post" novalidate action="savecontact.php">
        <header id="header" class="info">
          <h2>Contact</h2>
          <div></div>
        </header>
        <ul>
          <li id="foli1" class="notranslate">
            <label class="desc" id="title1" for="Field1">Message
              <span id="req_1" class="req">*</span>
            </label>
            <div>
              <textarea id="message" name="message" class="field textarea medium" spellcheck="true" rows="10" cols="50" tabindex="1" onkeyup="" required></textarea>
            </div>
            <p class="instruct" id="instruct1">
              <small>This field is required.</small>
            </p>
          </li>
          <li id="foli2" class="notranslate">
            <label class="desc" id="title2" for="Field2">Email Address
              <span id="req_1" class="req">*</span>
            </label>
            <div>
              <input id="email" name="email" type="email" spellcheck="false" class="field text large" value="" maxlength="255" tabindex="2" />
            </div>
            <p class="instruct" id="instruct2">
              <small>This field is required. We won't share this with strangers.</small>
            </p>
          </li>
          <li class="buttons ">
            <div>
              <input id="saveForm" name="saveForm" class="btTxt submit" type="submit" value="Submit" />
            </div>
          </li>
        </ul>
      </form>
    </div>
    <!--container-->
  </body>

</html>
