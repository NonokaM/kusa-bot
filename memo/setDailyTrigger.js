// GASで定期実行のトリガーを設定する処理
// 複数回実行して同じトリガーを増やさないよう注意

function setDailyTrigger() {
  ScriptApp.newTrigger("myFunctionToExecute")
    .timeBased()
    .atHour(18)
    .everyDays(1)
    .create();
}

function myFunctionToExecute() {
  // ここに実行したい関数の処理を記述する
  functionToExecute();
}

function functionToExecute() {
  // 実行したい関数の処理を記述する
  console.log('Hello');
}
