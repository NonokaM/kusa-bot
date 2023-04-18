function doPost(e) {
  let token = "GoMUYHkZWSWD5hCvvUM5WwZ/ehSjdf52m1Nn+CqgSCUnDCgcom4et2kEaMYOoHnB5KwL9K92JZIXmbSIN+uXiNYjTx/wdKS2sMqnNh4Q3xu5rfZD6xAIlrVnkQhJ0D5uL1C4dfNsGNZvFzMToM5OPgdB04t89/1O/w1cDnyilFU=";
  let eventData = JSON.parse(e.postData.contents).events[0];
  let replyToken = eventData.replyToken;
  // let userMessage = eventData.message.text;
  let url = 'https://api.line.me/v2/bot/message/reply';

  // ユーザー名を保存するためのグローバル変数
  let username = "";

  // 時間選択アクションが起こったとき
  if (eventData.type === "postback") {
    sendMessage = 
    let message = {
      type: "text",
      text: `通知時刻を${username}に設定しました。`,
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




  // // Postback event listener
  // if (eventData.postback && eventData.postback.data === "TIME") {
  //   const replyMessage = {
  //     type: "text",
  //     text: "ポストバックを受け取りました。",
  //   };
  //   replyMessage(replyToken, replyMessage);
  // }


  // // Postback event listener
  // if (event.postback.data === 'TIME') {
  //   // const time = event.postback.params[time];
  //   const replyMessage = { type: 'text', text: `通知時刻設定しました。`};
  //   replyMessage(replyToken, replyMessage);
  // }




  // // Postback event listener
  // if (event.postback.data === 'TIME') {
  //   const time = event.postback.params.time;
  //   const replyText = `通知時刻を ${time} に設定しました。`;
  //   const replyMessage = { type: 'text', text: replyText };
  //   replyMessage(replyToken, replyMessage);
  // }

  // eventData = JSON.parse(e.postData.contents).events[1];

  // if (eventData.message.type === "datetimepicker") {
  //     let message = {
  //     type: "text",
  //     text: "受け取ったよ"
  //   };
  //   replyMessage(replyToken, message);
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
