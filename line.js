function replyMessage(token, replyToken, message) {
  let url = 'https://api.line.me/v2/bot/message/reply';

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


function pushMessage(token, userId, pushMessageText) {
  let push_url = 'https://api.line.me/v2/bot/message/push';
  const message = {
    type: 'text',
    text: pushMessageText
  };
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  };
  const data = {
    to: userId,
    messages: [message],
  };
  const options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(data),
  };
  UrlFetchApp.fetch(push_url, options);
}
