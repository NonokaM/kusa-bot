// GASで定期実行のトリガーをつくる
// 複数回実行して同じトリガーを増やさないよう注意


function setDailyTrigger(kusaCheckTime) {
  if (kusaCheckTime) {
    var [hour, minute] = kusaCheckTime.split(":").map(str => parseInt(str));
    ScriptApp.newTrigger("pushContributions")
      .timeBased()
      .atHour(hour)
      .nearMinute(minute)
      .everyDays(1)
      .create();
  }
}

function pushContributions() {
  let pushMessageText = checkContributions();
  let properties = PropertiesService.getUserProperties();
  let userId = properties.getProperty('key');
  pushMessage(userId, pushMessageText);
}
