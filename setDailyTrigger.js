// GASで定期実行のトリガーを登録する
// 複数回実行して同じトリガーを増やさないよう注意


// setDailyTrigger('22:32');


function setDailyTrigger(kusaCheckTime) {
    if (kusaCheckTime) {
      var [hour, minute] = kusaCheckTime.split(":").map(str => parseInt(str));
      ScriptApp.newTrigger("myFunctionToExecute")
        .timeBased()
        .atHour(hour)
        .nearMinute(minute)
        .everyDays(1)
        .create();
      console.log(hour, minute);
    }
  }

  function myFunctionToExecute() {
    functionToExecute();
  }

  function functionToExecute() {
    console.log('Hello');
  }
