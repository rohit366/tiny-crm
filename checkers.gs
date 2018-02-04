function checkDueActives(projectID, labelIDs, token, sheet) {
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

  var lastRow = actives.getLastRow();
  var lastCol = actives.getLastColumn() - 1;

  var data = actives.getRange(2, 1, lastRow, lastCol).getValues();

  var title = "";
  if (today.getTime() > start && today.getTime() < end) {
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
  var statusCol = lastCol - 3;
  var timeCol = lastCol - 2;
  for (i in data) {
    // NOTE: This is the area of "inflexibility" because I have my selections set to the
    // output (first and second cells in each row plus the status); I'm still thinking of
    // how best to make this more general/flexibile for library users.
    var current = data[i][timeCol].getTime();
    if (current > start && current < end) {
      // launch update
      // - collect all falling into the launch period
      // - inform 
      
      
      
      
    } else if (current > end && current < twoWeek) {
      // general update
    
    
    };
  };

  return


//  for (i in data) {
//    var current = data[i][6].getTime();
//    if (current > start && current < end) {
//      if (status == a && data[i][5] == a) {
//        comment = comment + data[i][0] + ", " + data[i][1] + " - " + status + "\n";
//        count = count + 1;
//      } else if (status == b && data[i][5] == a && data[i][5] == b) {
//        comment = comment + data[i][0] + ", " + data[i][1] + " - " + status + "\n";
//        count = count + 1;
//      } else if (status == r && data[i][5] == a && data[i][5] == b && data[i][5] == r) {
//        comment = comment + data[i][0] + ", " + data[i][1] + " - " + status + "\n";
//        count = count + 1;
//      };
//    } else if (current > end && current < twoWeek) {
//      comment = comment + data[i][0] + "\n";
//      count = count + 1;
//    };
//  };
  if (count > 0) {
    createTask(title, comment, projectID, labelIDs, token);
  };
};

function signupCheck(projectID, labelIDs, token, sheet) {
  var signups = sheet.getSheetByName("signup");
  var settings = sheet.getSheetByName("settings");

  var feature = settings.getRange(1, 2).getValue();
  var status = settings.getRange(2, 2).getValue();
  var releaseDate = new Date(settings.getRange(3, 2).getValue());
  var currentDate = new Date();
  currentDate.setHours(0,0,0,0);

  var a = "alpha";
  var b = "beta";
  var r = "release";

  if (releaseDate.getTime() == currentDate.getTime()) {
    var lastRow = signups.getLastRow();
    var lastCol = signups.getLastColumn()-1;
    var data = signups.getRange(2, 1, lastRow, lastCol).getValues();

    var title = feature[0].toUpperCase() + feature.substring(1) + " feature " + status + " launch email update";
    var comment = "";

    var count = 0;
    var rowStatus = lastCol - 3;
    for (i in data) {
      if (status == a && data[i][rowStatus] == a) {
        comment = comment + data[i][0] + " - " + data[i][rowStatus] + "\n";
        count = count + 1;
      } else if (status == b && data[i][rowStatus] == a || data[i][rowStatus] == b) {
        comment = comment + data[i][0] + " - " + data[i][rowStatus] + "\n";
        count = count + 1;
      } else if (status == r && data[i][rowStatus] == a || data[i][rowStatus] == b || data[i][rowStatus] == r) {
        comment = comment + data[i][0] + " - " + data[i][rowStatus] + "\n";
        count = count + 1;
      };
    };
  };
  if (count > 0) {
    createTask(title, comment, projectID, labelIDs, token);
  };
};