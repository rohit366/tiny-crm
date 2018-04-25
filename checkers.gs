function checkReleaseState(projectRelease, rowRelease) {
  var a = "alpha";
  var b = "beta";
  var p = "production";
  
  if (projectRelease == a && rowRelease == a) {
    return true;
  } else if (projectRelease == b && (rowRelease == a || rowRelease == b)) {
    return true;
  } else if (projectRelease == p && (rowRelease == a || rowRelease == b || rowRelease == p)) {
    return true;
  };
  
  return false;
}

function activeCheck(projectID, labelIDs, checkRange, token, sheet) {
  var settings = sheet.getSheetByName("settings");
  var active = sheet.getSheetByName("active");

  var today = new Date().getTime();
  var prior = today - (1000*60*60*24*checkRange);

  var releaseStart = settings.getRange(3, 2).getValue().getTime();
  var releaseEnd = releaseStart + (1000*60*60*24*checkRange);

  var feature = settings.getRange(1, 2).getValue();
  var release = settings.getRange(2, 2).getValue();

  var title = "";
  if (today > releaseStart && today < releaseEnd) {
    title = feature[0].toUpperCase() + feature.substring(1) + " feature " + release + " release email announcement to active leads";
  } else {
    if (release == "none") {
      title = feature[0].toUpperCase() + feature.substring(1) + " email update to active leads";
    } else {
      title = feature[0].toUpperCase() + feature.substring(1) + " feature " + release + " release email update to active leads";
    };
  };

  var lastRow = active.getLastRow();
  var lastCol = active.getLastColumn() - 1;

  var data = active.getRange(2, 1, lastRow, lastCol).getValues();

  var comment = "";
  var count = 0;
  var releaseCol = lastCol - 3;
  var dateCol = lastCol - 2;

  for (i in data) {
    var current = new Date(data[i][dateCol]).getTime();
    if (current < prior && checkReleaseState(release, data[i][releaseCol])) {
      // The columns included in the Todoist comment are currently hard coded (known issue)
      if (data[i][releaseCol] == "") {
        comment = comment + data[i][0] + ", " + data[i][1] + "\n";
      } else {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + data[i][releaseCol] + "\n";
      };
      count = count + 1;
    };
  };

  if (count > 0) {
    createTask(title, comment, projectID, labelIDs, token);
  };
};

function signupCheck(projectID, labelIDs, token, sheet) {
  var signup = sheet.getSheetByName("signup");
  var settings = sheet.getSheetByName("settings");

  var feature = settings.getRange(1, 2).getValue();
  var release = settings.getRange(2, 2).getValue();
  var releaseDate = new Date(settings.getRange(3, 2).getValue());
  var currentDate = new Date();
  currentDate.setHours(0,0,0,0);

  var a = "alpha";
  var b = "beta";
  var p = "production";

  if (releaseDate.getTime() == currentDate.getTime()) {
    var lastRow = signup.getLastRow();
    var lastCol = signup.getLastColumn()-1;
    var data = signup.getRange(2, 1, lastRow, lastCol).getValues();

    var title = feature[0].toUpperCase() + feature.substring(1) + " feature " + release + " release email update to existing users";
    var comment = "";

    var count = 0;
    var releaseCol = lastCol - 3;
    for (i in data) {
      // The columns included in the Todoist comment are currently hard coded (known issue)
      if (release == a && data[i][releaseCol] == a) {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + data[i][releaseCol] + "\n";
        count = count + 1;
      } else if (release == b && data[i][releaseCol] == a || data[i][releaseCol] == b) {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + data[i][releaseCol] + "\n";
        count = count + 1;
      } else if (release == p && data[i][releaseCol] == a || data[i][releaseCol] == b || data[i][releaseCol] == p) {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + data[i][releaseCol] + "\n";
        count = count + 1;
      };
    };
  };

  if (count > 0) {
    createTask(title, comment, projectID, labelIDs, token);
  };
};