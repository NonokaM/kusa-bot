function doPost(e) {
  let token = "";
  let eventData = JSON.parse(e.postData.contents).events[0];
  let replyToken = eventData.replyToken;
  // let userMessage = eventData.message.text;
  let url = 'https://api.line.me/v2/bot/message/reply';

  // ユーザー名を保存するためのグローバル変数
  // var username = "";

  // テキストメッセージを受け取ったとき
  if (eventData.message.text) {
    let userMessage = eventData.message.text;

    if (userMessage === "Githubユーザー名を設定") {
      let message = {
        type: "text",
        text: "Githubのユーザー名を入力してください。"
      }
      replyMessage(replyToken, message);
    }


    if (userMessage === "現在の草情報") {
      let message = {
        type: "text",
        text: "今日はまだ草が生えていません。"
      }
      replyMessage(replyToken, message);
    }


    // 時間選択アクションを起こす
    if (userMessage === "通知時刻を設定") {
      // let timeMessage = 
      replyMessage(
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
    // let username = userMessage;

    var userId = event.source.userId;
    var text = event.message.text;
    var properties = PropertiesService.getUserProperties();
    properties.setProperty(userId, text);

    var properties = PropertiesService.getUserProperties();
    var savedText = properties.getProperty(userId);

    // ユーザー名を登録した後の処理
    if (username !== "") {
      let message = {
        type: "text",
        text: `ユーザー名を${savedText}に設定しました。`
      };
      replyMessage(replyToken, message);
      // // ユーザー名を初期化する
      // username = "";
      return;
    }
    // }
  }


  // 時間選択アクションを受け取ったとき
  if (eventData.type === "postback") {
    var kusaCheckTime = eventData.postback.params.time;
    let message = {
      type: "text",
      text: `通知時刻を${kusaCheckTime}に設定しました。`,
    };
    replyMessage(replyToken, message);
  }


  // その他の処理（例えば、草の有無をチェックする処理）
  checkContributions(replyToken, url, token, username);


  function checkContributions(replyToken, url, token, username) {
    let user = username;
    let git_url = `https://github.com/users/${user}/contributions`;
    let response = UrlFetchApp.fetch(git_url);
    let html = response.getContentText();
    let hasContribution = html.includes("No contributions on Saturday, April 15, 2023");
    console.log(hasContribution)
    let replyMessage = "";
    if (hasContribution) {
      replyMessage = "草生えてないよ";
    } else {
      replyMessage = "草生えてるよ";
    }

    let message = {
      type: "text",
      text: replyMessage
    };
    let payload = {
      replyToken: replyToken,
      messages: [message]
    };
    let options = {
      payload: JSON.stringify(payload),
      method: 'POST',
      headers: {"Authorization" : "Bearer " + token},
      contentType: 'application/json'
    };
    UrlFetchApp.fetch(url, options);
  }

  function replyMessage(replyToken, message) {
    let payload = {
      replyToken: replyToken,
      messages: [message]
    };
    let options = {
      payload: JSON.stringify(payload),
      method: 'POST',
      headers: {"Authorization" : "Bearer " + token},
      contentType: 'application/json'
    };
    UrlFetchApp.fetch(url, options);
  }
}
