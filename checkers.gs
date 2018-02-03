function checkDueActives(token, sheet) {
  var settings = sheet.getSheetByName("settings");
  var actives = sheet.getSheetByName("active");

  var a = "alpha";
  var b = "beta";
  var r = "release";

  var feature = settings.getRange(1, 2).getValue();
  var status = settings.getRange(2, 2).getValue();
  var start = settings.getRange(3, 2).getValue().getTime();
  var end = start + (60*60*24*14);
  var today = new Date();
  var twoWeek = today.getTime() - (60*60*24*14);
    
  var lastRow = actives.getLastRow()-1;
  var lastCol = actives.getLastColumn()-2;

  var data = actives.getRange(2, 1, lastRow, lastCol).getValues();

  var title = "";
  if (today.getTime() > start && current < end) {
    title = title + feature[0].toUpperCase() + feature.substring(1) + " feature " + status + " launch announcement";
  } else {
    if (status == "none") {
      title = title + feature[0].toUpperCase() + feature.substring(1) + " feature email update";
    } else {
      title = title + feature[0].toUpperCase() + feature.substring(1) + " feature " + status + " status email update";
    };
  };
  var comment = "";
  
  var count = 0;
  
  for (i in data) {
    var current = data[i][6].getTime();
    if (current > start && current < end) {
      if (status == a && data[i][5] == a) {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + status + "\n";
        count = count + 1;
      } else if (status == b && data[i][5] == a && data[i][5] == b) {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + status + "\n";
        count = count + 1;
      } else if (status == r && data[i][5] == a && data[i][5] == b && data[i][5] == r) {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + status + "\n";
        count = count + 1;
      };
    } else if (current > end && current < twoWeek) {
      comment = comment + data[i][0] + "\n";
      count = count + 1;
    };
  };
  if (count > 0) {
    createTask(title, comment, token);
  };
};

function checkDueSignups(token, sheet) {
  var signups = sheet.getSheetByName("signup");
  var settings = sheet.getSheetByName("settings");

  var a = "alpha";
  var b = "beta";
  var r = "release";

  var feature = settings.getRange(1, 2).getValue();
  var status = settings.getRange(2, 2).getValue();

  var lastRow = signups.getLastRow()-1;
  var lastCol = signups.getLastColumn()-3;

  var data = signups.getRange(2, 1, lastRow, lastCol).getValues();

  var title = feature[0].toUpperCase() + feature.substring(1) + " feature " + status + " status email update";
  var comment = "";

  var count = 0;
  
  for (i in data) {
    if (status == a && data[i][5] == a) {
      comment = comment + data[i][0] + " - " + data[i][5] + "\n";
      count = count + 1;
    } else if (status == b && data[i][5] == a || data[i][5] == b) {
      comment = comment + data[i][0] + " - " + data[i][5] + "\n";
      count = count + 1;
    } else if (status == r && data[i][5] == a || data[i][5] == b || data[i][5] == r) {
      comment = comment + data[i][0] + " - " + data[i][5] + "\n";
      count = count + 1;
    };
  };
  if (count > 0) {
    createTask(title, comment, token);
  };
};