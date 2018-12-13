# club_encyclopedia_scripts

# 概要
- 京大生協新入生サポート事務局のサークル大百科制作にて，掲載団体を登録する Google Form から各団体に自動で案内を返信するためのGoogle Apps Scripts．
- 原稿提出のためのウェブページのHTMLとGAS．

# 自動返信 使い方
1. フォームの解答をスプレッドシートに出力

2. スプレッドシートのツールからスクリプトエディタを開き，[autoreply.gs](https://github.com/hoppiece/club_encyclopedia_scripts/blob/master/autoreply.gs) をコピペして保存．コードの内容は送信文に合わせて適宜変更．

3. 関数のトリガーを解答を受け取ったときに設定  

## Memo
- [autoreply.gs](https://github.com/hoppiece/club_encyclopedia_scripts/blob/master/autoreply.gs) は Google Form の回答を受け取りをトリガーとして関数 autoreply() を実行する JavaScrept 風のスクリプト.
- 関数の中身では主に本文生成を行っている．具体的には  
1. 変数 `title`: メールのタイトル．
2. 変数 `body`: メールの本文．`body` にどんどん内容を足していっている．フォームの回答はGASの関数でスプレッドシートから呼び出して `body` に加えている．メール後半の内容を `footer` に書いておいて最後に `body` に足している．スプレッドシート周りの呼び出しについては [GAS のリファレンス](https://developers.google.com/apps-script/reference/spreadsheet/) を参照． 
変数`cols`の値は，アンケートの質問の個数と同じにする．従来バージョンでは，回答スプレッドシートの列数を取得して`cols`に代入していたが，回答スプレッドシートで各顧客についての情報を追加したときのために，確認文の要素が打ち止めになるようにした．
3. [GAS のメールまわりの関数](https://developers.google.com/apps-script/reference/gmail/)で送信．
- フォームの方で，電話番号欄を電話番号の型以外を弾くようにした．(具体的には電話番号のGoogleフォームを短答記述で `^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$` という正規表現に一致するものだけを受け入れるようにした．  v
すると回答がスプレッドシートに流し込まれた際，電話番号が数値型だと判断されて先頭のゼロが消えてしまう．  
そこでメールを本文を作成する際，電話番号データの頭が0でないない場合は，0を追加して，スプレッドシートのデータも文字列に直すようなコードを挟んだ．

## 参考にしたサイト
https://itwork100.com/google-form-gas/

https://dv7.jp/blog/2018/01/10/google%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E3%81%A8%E9%80%A3%E6%90%BA%E3%81%97%E3%81%9F%E6%99%82%E3%81%AB%E9%9B%BB%E8%A9%B1/

### コメント
本当は自分でサーバ用意していろいろ作った方が可能な実装も参考文献も充実していて作りやすそうですが生協のサーバは直接触れないので... GASならそこそこのものがタダで安全に作れて便利ですね．