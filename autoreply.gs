function autoreply() {
    

 var title = "サークル大百科掲載 今後のご案内"; 
 var body
 = "2019年度サークル大百科掲載の掲載登録を受け付けました。\n"
 +"下記の通りで登録内容に誤りが無いかご確認ください。\n\n"
 + "------------------------------------------------------------\n";
 var footer
 = "------------------------------------------------------------\n\n"
 + "訂正等がある場合、XXXXまで連絡してください。"
 + "\n\n"
 + "今後の手続きについてご案内します。\n\n"
 + "■ 紙媒体で出稿する団体の方\n"
 + "    12月25日(火)，26日(水)，27日(木)，28日(金) 18時30分 吉田食堂1階に、\n"
 + "    1.原稿掲載料 2.誓約書 3.完成原稿 \n"
 + "    の3点をお持ち下さい。\n\n"
 + "■ データで出稿する団体の方 \n"
 + "    下記の原稿掲載料の支払日までに原稿をXXXXしてください。"
 + "    12月25日(火)，26日(水)，27日(木)，28日(金) 18時30分に、\n"
 + "    1.原稿掲載料 2．誓約書 \n"
 + "    の2点をお持ち下さい。 \n"
 + "    場所は吉田食堂1階です \n"
 + "\n"
 + "原稿は説明会資料をよく読んだ上で、不備の無いよう提出して下さい。"
 + "不明点等があれば、XXXXまで連絡してください。"
 + "\n\n\n"
 + "新入生サポート事務局"
 ;
 

 var name = '団体名(正式名称)';
 var mail = 'メールアドレス';
　　var address = "";
 var tel = '電話番号'
 
 var sheet = SpreadsheetApp.getActiveSheet();
 var rows = sheet.getLastRow();
 var cols = sheet.getLastColumn();
 var rg = sheet.getDataRange();
 Logger.log("rows="+rows+" cols="+cols);
 
 for (var i = 1; i <= cols; i++ ) {
 var col_name = rg.getCell(1, i).getValue(); 
 var col_value = rg.getCell(rows, i).getValue(); 
 body += "■"+col_name+"\n";
    //電話番号の先頭のゼロをなんとかする
 var update_value = col_value;
if ((col_name === tel) && String(col_value).substr(0,1) !== "0"){
    update_value = "0"+col_value;
}
if(update_value !== col_value){
    // スプレッドシートの方も書き換える
    sheet.getRange(rows, i).setValue("'"+update_value);
    col_value = update_value;
}
 body += col_value + "\n\n";
 if ( col_name === name ) {
 body = col_value+" 様\n\n"+body;
 }
 if ( col_name === mail ) {
 address = col_value;
 }
 }
 body += footer;
 

 GmailApp.sendEmail(address,title,body);
}