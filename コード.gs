function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function processForm(formObject) {
  var formBlob = formObject.myFile;
  var formName = formObject.name;
  var driveFile = DriveApp.createFile(formBlob);
  var uploadFolder = DriveApp.getFolderById("1WZnzSxZXe-NcaXiEKTePKwdLjL3O7z3Z");
  driveFile.makeCopy(formName,uploadFolder);
  return driveFile.getUrl();
}