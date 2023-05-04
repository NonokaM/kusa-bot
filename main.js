function doPost(e) {
  let eventData = JSON.parse(e.postData.contents).events[0];
  let token = "HBbIZFhu3X10hH+MxVaUN96fijH3cfhsR2sr4iwqCmlwYGCptSTWl3Ut29XW5fGz5KwL9K92JZIXmbSIN+uXiNYjTx/wdKS2sMqnNh4Q3xuI2GNsHoOCZzzllQGZXf/MfF3F2qno8kAkI+5ZDDQvCAdB04t89/1O/w1cDnyilFU=";
  let replyToken = eventData.replyToken;
  // let userId = eventData.source.userId;
  let userId = eventData.source.userId;


  // 時間選択アクションを受け取ったとき
  if (eventData.type === "postback") {
    var kusaCheckTime = eventData.postback.params.time;

    // トリガーを登録
    setDailyTrigger(kusaCheckTime);

    let message = {
      type: "text",
      text: `通知時刻を${kusaCheckTime}に設定しました。`,
    };
    replyMessage(token, replyToken, message);
  }


  // テキストメッセージを受け取ったとき
  if (eventData.message.text) {
    let userMessage = eventData.message.text;

    if (userMessage === "Githubユーザー名を設定") {
      let message = {
        type: "text",
        text: "Githubのユーザー名を入力してください。"
      };
      replyMessage(token, replyToken, message);
    }


    if (userMessage === "現在の草情報") {

      var contributionsMessage = checkContributions();

      let message = {
        type: "text",
        text: contributionsMessage
      }
      replyMessage(token, replyToken, message);
    }


    // 時間選択アクションを起こす
    if (userMessage === "通知時刻を設定") {
      // let timeMessage =
      replyMessage(
        token,
        replyToken,
        {
        type: 'template',
        altText: 'Datetime pickers alt text',
        template: {
          type: 'buttons',
          text: 'Select date / time !',
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


    // if (userMessage !== "Githubユーザー名を設定" && userMessage !== "通知時刻を設定") {
    let userName = userMessage;
    let messageText = "";

    var properties = PropertiesService.getUserProperties();
    var savedText = properties.getProperty(userId);

    // ユーザー名を登録した後の処理
    if (savedText === null) {
      properties.setProperty(userId, userName);
      var savedText = properties.getProperty(userId);
      messageText = `ユーザー名を${savedText}に設定しました。`
    } else {
      properties.setProperty(userId, userName);
      var savedText = properties.getProperty(userId);
      messageText = `ユーザー名を${savedText}に変更しました。`
    }

    let message = {
      type: "text",
      text: messageText
    }
    replyMessage(token, replyToken, message);
    // }
  }
}
