// GASで定期実行のトリガーをつくる

function setDailyTrigger(kusaCheckTime) {
  if (kusaCheckTime) {
    let [hour, minute] = kusaCheckTime.split(":").map(str => parseInt(str));
    ScriptApp.newTrigger("pushContributions")
      .timeBased()
      .atHour(hour)
      .nearMinute(minute)
      .everyDays(1)
      .create();
  }
}


// 定期実行する関数
// 草が生えていないとき、メッセージを送信する

function pushContributions() {
  let pushMessageText = checkContributions();
  if (pushMessageText === '草生えてないよ') {
    let properties = PropertiesService.getUserProperties();
    let userId = properties.getProperty('userIdKey');
    pushMessage(userId, pushMessageText);
  }
}
