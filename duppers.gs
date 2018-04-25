function checkDuplicates(spreadsheet) {
  var sheets = spreadsheet.getSheets().slice(1, 6);
  var sheetsValues = new Array();
  for (i in sheets) {
    var lastRow = sheets[i].getLastRow();
    var sheetValues = sheets[i].getRange(2, 1, lastRow).getValues();
    sheetsValues.push(sheetValues);
  };
  Browser.msgBox(sheetsValues);
};
