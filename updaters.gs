function updater(spreadsheet) {
  var sheets = spreadsheet.getSheets().slice(1, 6);
  for (i in sheets) {
    var lastRow = sheets[i].getLastRow();
    var lastCol = sheets[i].getLastColumn() - 1;
    var data = sheets[i].getRange(2, lastCol - 2, lastRow - 1, lastCol).getValues();
    var sheetName = sheets[i].getName();
    for (j in data) {
      var row = parseInt(j) + 2;
      var rowStatus = data[j][2];
      if (rowStatus != sheetName && rowStatus != "") {
        var rangeToCopy = sheets[i].getRange(row, 1, 1, lastCol);
        rangeToCopy.copyTo(spreadsheet.getSheetByName(rowStatus).getRange(spreadsheet.getSheetByName(rowStatus).getLastRow()+1, 1));
        sheets[i].deleteRow(row);
      };
    };
  };
};