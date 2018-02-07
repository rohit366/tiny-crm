function activesCheck(projectID, labelIDs, token, sheet) {
  var settings = sheet.getSheetByName("settings");
  var actives = sheet.getSheetByName("active");

  var today = new Date().getTime();
  // Hard coded to two weeks currently
  var prior = today - (1000*60*60*24*14);

  var launchStart = settings.getRange(3, 2).getValue().getTime();
  var launchEnd = launchStart + (1000*60*60*24*14);

  var feature = settings.getRange(1, 2).getValue();
  var status = settings.getRange(2, 2).getValue();

  var title = "";
  if (today > launchStart && today < launchEnd) {
    title = "Launch announcement for " + feature + " " + status + " to active leads";
  } else {
    if (status == "none") {
      title = "Update email for " + feature + " to active leads";
    } else {
      title = "Update email for " + feature + " " + status + " to active leads";
    };
  };

  var lastRow = actives.getLastRow();
  var lastCol = actives.getLastColumn() - 1;

  var data = actives.getRange(2, 1, lastRow, lastCol).getValues();

  var comment = "";
  var count = 0;
  var statusCol = lastCol - 3;
  var timeCol = lastCol - 2;

  for (i in data) {
    var current = new Date(data[i][timeCol]).getTime();
    if (current < prior) {
      // The columns included in the Todoist comment are currently hard coded (known issue)
      if (data[i][statusCol] == "") {
        comment = comment + data[i][0] + ", " + data[i][1] + "\n";
      } else {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + data[i][statusCol] + "\n";
      };
      count = count + 1;
    };
  };

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

    var title = feature[0].toUpperCase() + feature.substring(1) + " feature " + status + " launch email update to existing users";
    var comment = "";

    var count = 0;
    var statusCol = lastCol - 3;
    for (i in data) {
      // The columns included in the Todoist comment are currently hard coded (known issue)
      if (status == a && data[i][statusCol] == a) {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + data[i][statusCol] + "\n";
        count = count + 1;
      } else if (status == b && data[i][statusCol] == a || data[i][statusCol] == b) {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + data[i][statusCol] + "\n";
        count = count + 1;
      } else if (status == r && data[i][statusCol] == a || data[i][statusCol] == b || data[i][statusCol] == r) {
        comment = comment + data[i][0] + ", " + data[i][1] + " - " + data[i][statusCol] + "\n";
        count = count + 1;
      };
    };
  };
  if (count > 0) {
    createTask(title, comment, projectID, labelIDs, token);
  };
};