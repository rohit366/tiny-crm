function updater(spreadsheet) {
  // This assumes that the "settings" sheet is first in the spreadsheet 
  var sheets = spreadsheet.getSheets().slice(1, 6);
  for (i in sheets) {
    var lastRow = sheets[i].getLastRow();
    var lastCol = sheets[i].getLastColumn() - 1;
    // The three last columns sould be used to hold "Status", "Contact date", and "Stage" information
    var data = sheets[i].getRange(2, lastCol - 2, lastRow - 1, lastCol).getValues();
    var sheetName = sheets[i].getName();
    for (j in data) {
      var row = parseInt(j) + 2;
      var stageCol = data[j][2];
      if (stageCol != sheetName && stageCol != "") {
        var rangeToCopy = sheets[i].getRange(row, 1, 1, lastCol);
        rangeToCopy.copyTo(spreadsheet.getSheetByName(stageCol).getRange(spreadsheet.getSheetByName(stageCol).getLastRow()+1, 1));
        sheets[i].deleteRow(row);
      };
    };
  };
};