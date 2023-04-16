function doPost(e) {
  let token = "GoMUYHkZWSWD5hCvvUM5WwZ/ehSjdf52m1Nn+CqgSCUnDCgcom4et2kEaMYOoHnB5KwL9K92JZIXmbSIN+uXiNYjTx/wdKS2sMqnNh4Q3xu5rfZD6xAIlrVnkQhJ0D5uL1C4dfNsGNZvFzMToM5OPgdB04t89/1O/w1cDnyilFU=";
  let eventData = JSON.parse(e.postData.contents).events[0];
  let replyToken = eventData.replyToken;
  let userMessage = eventData.message.text;
  let url = 'https://api.line.me/v2/bot/message/reply';

  // ユーザー名を保存するためのグローバル変数
  let username = "";

  // ユーザー名を登録するための処理
  if (userMessage === "Githubユーザー名を設定") {
    let message = {
      type: "text",
      text: "ユーザー名を教えてください。"
    };
    replyMessage(replyToken, message);
  }

  if (userMessage !== "Githubユーザー名を設定" && userMessage !== "通知時刻を設定" && eventData.message.type === "text") {
    username = userMessage;

    // ユーザー名を登録した後の処理
    if (username !== "") {
      let message = {
        type: "text",
        text: `ユーザー名を${username}に設定しました。`
      };
      replyMessage(replyToken, message);
      // // ユーザー名を初期化する
      // username = "";
      return;
    }
  }

  // 通知時刻を登録するための処理
  if (userMessage === "通知時刻を設定") {
    let timeMessage = {
      "type": "datetimepicker",
      "label": "Select date",
      "data": "storeId=12345",
      "mode": "datetime",
      "initial": "2017-12-25t00:00",
      "max": "2018-01-24t23:59",
      "min": "2017-12-25t00:00"
    }
    replyMessage(replyToken, timeMessage);
  }

  // if (userMessage !== "Githubユーザー名を設定" && eventData.message.type === "text") {
  //   sendTime = userMessage;

  //   // ユーザー名を登録した後の処理
  //   if (username !== "") {
  //     let message = {
  //       type: "text",
  //       text: `ユーザー名を${username}に設定しました。`
  //     };
  //     replyMessage(replyToken, message);
  //     // // ユーザー名を初期化する
  //     // username = "";
  //     return;
  //   }
  // }

  // } else if (username === "") { // ユーザー名が未登録の場合
  //   username = userMessage;
  //   let message = {
  //     type: "text",
  //     text: `ユーザー名 ${username} を登録しました。`
  //   };
  //   replyMessage(replyToken, message);
  //   return;
  // }

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
      console.log("草生えてないよ");
    } else {
      replyMessage = "草生えてるよ";
      console.log("草生えてるよ");
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
