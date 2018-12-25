function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function processForm(formObject) {
  //フォームに提出された原稿ファイルを取得
  var formBlob = formObject.myFile;

  //フォームに書かれた団体名を取得
  var formName = formObject.name;

  //原稿ファイルをDrive内のrootに作成
  var driveFile = DriveApp.createFile(formBlob);

  //保存用フォルダを取得．引数のIDはそのフォルダのURL内の英数字(ググって)
  var uploadFolder = DriveApp.getFolderById("1WZnzSxZXe-NcaXiEKTePKwdLjL3O7z3Z");

  //提出原稿のファイル名を団体名にして保存用フォルダにコピー
  driveFile.makeCopy(formName,uploadFolder);

  //このままだとrootが散らかるので整理兼バックアップ(もし団体名にアカン文字使われたときの対策)のフォルダを取得
  var backupFolder = DriveApp.getFolderById("1YtEBbLq2Kp1gSEdFvgBVTO-sekUqLC3Z");

  //root内の原稿データを移動and消去
  backupFolder.addFile(driveFile);
  DriveApp.getRootFolder().removeFile(driveFile);
  
  return driveFile.getUrl();
}