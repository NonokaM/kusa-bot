function doPost(e) {
  let eventData = JSON.parse(e.postData.contents).events[0];
  let token = "";
  let replyToken = eventData.replyToken;
  // let userId = eventData.source.userId;

  // let userMessage = eventData.message.text;

  // ユーザー名を保存するためのグローバル変数
  // var username = "";


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
    let username = userMessage;

    var userId = eventData.source.userId;
    // var savedText = eventData.message.text;
    var properties = PropertiesService.getUserProperties();
    // properties.setProperty(userId, username);
    var savedText = properties.getProperty(userId);

    // ユーザー名を登録した後の処理
    if (savedText === null) {
    properties.setProperty(userId, username);
    var savedText = properties.getProperty(userId);

      let message = {
        type: "text",
        text: `ユーザー名を${savedText}に設定しました。`
      };
      replyMessage(token, replyToken, message);
      // // ユーザー名を初期化する
      // username = "";
      // return;
    } else {
      savedText = properties.getProperty(userId);
      let message = {
        type: "text",
        text: `ユーザー名は${savedText}に設定済みです。`
      }
      replyMessage(token, replyToken, message);
    }
    // }
  }
}
