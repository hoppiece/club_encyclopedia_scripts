function autoreply() {

    var title = "サークル大百科掲載 今後のご案内"; 
    var body
    = "2019年度サークル大百科掲載の掲載登録を受け付けました。\n"
    +"下記の通りで登録内容に誤りが無いかご確認ください。\n\n"
    + "------------------------------------------------------------\n";
    var footer
    = "------------------------------------------------------------\n\n"
    + "訂正等がある場合、circlepedia@s-coop.net まで連絡してください。"
    + "\n\n"
    + "今後の手続きについてご案内します。\n\n"
    + "■ 紙媒体で提出する団体の方\n"
    + "    原稿は掲載料・誓約書提出と同時に渡してください。\n\n"
    + "    ●掲載料支払い・誓約書提出の日程 \n"
    + "    【日時】    12月25日(火)，26日(水)，27日(木)，28日(金) 18時30分から19時30分 \n"
    + "    【場所】    吉田食堂1階 \n"
    + "    【持参物】    1.原稿掲載料(3000円) 2.誓約書(必要事項が記入済み，学生証のコピーが貼付済みのもの) 3.完成原稿 \n\n"
   
    + "■ データで出稿する団体の方 \n"
    + "    原稿掲載料の支払いまでに原稿を https://script.google.com/macros/s/AKfycby9ETLmcNfCV1glpfOVo-ST0zbbOdhOpoZ8E08xyRILrl8esq-G/exec からアップロードしてください。 \n"
    + "    ●掲載料支払い・誓約書提出の日程 \n"
    + "    【日時】    12月25日(火)，26日(水)，27日(木)，28日(金) 18時30分から19時30分 \n"
    + "    【場所】    吉田食堂1階 \n"
    + "    【持参物】    1.原稿掲載料(3000円) 2.誓約書(必要事項が記入済み，学生証のコピーが貼付済みのもの) \n\n"
    
    + "原稿は説明会配布の「原稿制作の注意」( https://drive.google.com/open?id=1CWgjI9wY24XFHCL5A2JyLm3Y34_QNyqP )をよく読んだ上で、不備の無いよう提出して下さい。"
    + "\n\n\n"
    + "京大生協 新入生サポート事務局 \n"
    + "TEL:  075-752-0387 \n"
    + "Mail:  circlepedia@s-coop.net"
    ;
    
   
    var name = '団体名(正式名称)';
    var mail = 'メールアドレス';
   　　var address = "";
    var tel = '電話番号'
    
    var sheet = SpreadsheetApp.getActiveSheet();
    var rows = sheet.getLastRow();
    //var cols = sheet.getLastColumn();
    var cols = 10; //アンケートの質問の個数にする
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