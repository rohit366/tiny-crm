function updateLeadPage(sheet) {
  var leads = "leads";
  var active = "active";
  var signup = "signup";
  var decline = "decline";
  var storage = "storage";
    
  var leadsSheet = sheet.getSheetByName(leads);
  var activeSheet = sheet.getSheetByName(active);
  var signupSheet = sheet.getSheetByName(signup);
  var declineSheet = sheet.getSheetByName(decline);
  var storageSheet = sheet.getSheetByName(storage);

  var lastRow = leadsSheet.getLastRow();
  var lastCol = leadsSheet.getLastColumn()-1;
  var stages = leadsSheet.getRange(2, lastCol, lastRow).getValues();
  
  for (i in stages) {
    var row = parseInt(i) + 2;
    if (stages[i] == active) {
      var rangeToCopy = leadsSheet.getRange(row, 1, 1, lastCol);
      rangeToCopy.copyTo(activeSheet.getRange(activeSheet.getLastRow()+1, 1));
      leadsSheet.deleteRow(parseInt(i)+2);
    } else if (stages[i] == signup) {
      var rangeToCopy = leadsSheet.getRange(row, 1, 1, lastCol);
      rangeToCopy.copyTo(signupSheet.getRange(signupSheet.getLastRow()+1, 1));
      leadsSheet.deleteRow(parseInt(i)+2);
    } else if (stages[i] == decline) {
      var rangeToCopy = leadsSheet.getRange(row, 1, 1, lastCol);
      rangeToCopy.copyTo(declineSheet.getRange(declineSheet.getLastRow()+1, 1));
      leadsSheet.deleteRow(parseInt(i)+2);
    } else if (stages[i] == storage) {
      var rangeToCopy = leadsSheet.getRange(row, 1, 1, lastCol);
      rangeToCopy.copyTo(storageSheet.getRange(storageSheet.getLastRow()+1, 1));
      leadsSheet.deleteRow(parseInt(i)+2);
    };
  };
};

function updateActivePage(sheet) {
  var active = "active";
  var signup = "signup";
  var decline = "decline";
  var storage = "storage";

  var activeSheet = sheet.getSheetByName(active);
  var signupSheet = sheet.getSheetByName(signup);
  var declineSheet = sheet.getSheetByName(decline);
  var storageSheet = sheet.getSheetByName(storage);

  var lastRow = activeSheet.getLastRow();
  var lastCol = activeSheet.getLastColumn()-1;
  var stages = activeSheet.getRange(2, lastCol, lastRow).getValues();
  
  for (i in stages) {
    var row = parseInt(i) + 2;
    if (stages[i] == signup) {
      var rangeToCopy = activeSheet.getRange(row, 1, 1, lastCol);
      rangeToCopy.copyTo(signupSheet.getRange(signupSheet.getLastRow()+1, 1));
      activeSheet.deleteRow(parseInt(i)+2);
    } else if (stages[i] == decline) {
      var rangeToCopy = activeSheet.getRange(row, 1, 1, lastCol);
      rangeToCopy.copyTo(declineSheet.getRange(declineSheet.getLastRow()+1, 1));
      activeSheet.deleteRow(parseInt(i)+2);
    } else if (stages[i] == storage) {
      var rangeToCopy = activeSheet.getRange(row, 1, 1, lastCol);
      rangeToCopy.copyTo(storageSheet.getRange(storageSheet.getLastRow()+1, 1));
      activeSheet.deleteRow(parseInt(i)+2);
    };
  };
};