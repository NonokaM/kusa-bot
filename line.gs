const token = "CHANNEL_ACCESS_TOKEN";


function replyMessage(replyToken, message) {
  const replyUrl = 'https://api.line.me/v2/bot/message/reply';
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
  UrlFetchApp.fetch(replyUrl, options);
}


function pushMessage(userId, pushMessageText) {
  const push_url = 'https://api.line.me/v2/bot/message/push';
  let message = {
    type: 'text',
    text: pushMessageText
  };
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  };
  let data = {
    to: userId,
    messages: [message],
  };
  let options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(data),
  };
  UrlFetchApp.fetch(push_url, options);
}
