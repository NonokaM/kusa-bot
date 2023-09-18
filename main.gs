function doPost(e) {
  let eventData = JSON.parse(e.postData.contents).events[0];
  let replyToken = eventData.replyToken;
  let userId = eventData.source.userId;
  let properties = PropertiesService.getUserProperties();
  properties.setProperty('userIdKey', userId);


  // 時間選択アクションを受け取ったとき
  if (eventData.type === "postback") {
    let kusaCheckTime = eventData.postback.params.time;

    // トリガーを登録
    setDailyTrigger(kusaCheckTime);

    let message = {
      type: "text",
      text: `通知時刻を${kusaCheckTime}に設定しました。`,
    };
    replyMessage(replyToken, message);
  }


  // テキストメッセージを受け取ったとき
  if (eventData.message.text) {
    let userMessage = eventData.message.text;

    if (userMessage === "Githubユーザー名を設定") {
      let message = {
        type: "text",
        text: "Githubのユーザー名を入力してください。"
      };
      replyMessage(replyToken, message);
    }


    if (userMessage === "現在の草情報") {

      let contributionsMessage = checkContributions();

      let message = {
        type: "text",
        text: contributionsMessage
      }
      replyMessage(replyToken, message);
    }


    // 時間選択アクションを起こす
    if (userMessage === "通知時刻を設定") {
      replyMessage(
        replyToken,
        {
        type: 'template',
        altText: 'Datetime pickers alt text',
        template: {
          type: 'buttons',
          text: 'Set notification time',
          actions: [
            { type: 'datetimepicker',
            label: 'time',
            data: 'TIME',
            mode: 'time',
            initial: "21:00"
            }
          ],
        },
        }
      )
    }


    if (userMessage !== "Githubユーザー名を設定" && userMessage !== "現在の草情報" && userMessage !== "通知時刻を設定"){
      // ユーザー名を登録
      let userName = userMessage;
      let messageText = "";
      properties = PropertiesService.getUserProperties();
      let savedText = properties.getProperty('userNameKey');

      if (savedText === null) {
        properties.setProperty('userNameKey', userName);
        savedText = properties.getProperty('userNameKey');
        messageText = `ユーザー名を${savedText}に設定しました。`
      } else {
        properties.setProperty('userNameKey', userName);
        savedText = properties.getProperty('userNameKey');
        messageText = `ユーザー名を${savedText}に変更しました。`
      }

      let message = {
        type: "text",
        text: messageText
      }
      replyMessage(replyToken, message);
    }
  }
}



// 関数が実行されたとき、その日、Githubに草が生えているか判別する

function checkContributions() {
  let formattedDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  let contributionsMessage = '';
  let properties = PropertiesService.getUserProperties();
  let userName = properties.getProperty('userNameKey');

  let git_url = `https://github.com/users/${userName}/contributions`; // ?from=2023-01-01
  let response = UrlFetchApp.fetch(git_url);
  let html = response.getContentText();
  let hasContributions = html.includes(`No contributions on ${formattedDate}`);

  if (hasContributions) {
    contributionsMessage = '草生えてないよ';
  } else {
    contributionsMessage = '草生えてるよ';
  }

  return contributionsMessage;
}



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
