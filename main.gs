function doPost(e) {
  let eventData = JSON.parse(e.postData.contents).events[0];
  let replyToken = eventData.replyToken;
  let userId = eventData.source.userId;
  let properties = PropertiesService.getUserProperties();
  properties.setProperty('userIdKey', userId);


  if (eventData.type === "postback") {
    let kusaCheckTime = eventData.postback.params.time;

    setDailyTrigger(kusaCheckTime);
    
    let message = {
      type: "text",
      text: `通知時刻を${kusaCheckTime}に設定しました。`,
    };
    replyMessage(replyToken, message);
  }


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
