function doPost(e) {
    const json = JSON.parse(e.postData.contents);
    const userId = json.events[0].source.userId;

    pushMessage();

    function pushMessage() {
      const CHANNEL_ACCESS_TOKEN = '';
      const message = {
        type: 'text',
        text: 'Hello, world!'
      };
      
      const url = 'https://api.line.me/v2/bot/message/push';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
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
      
      UrlFetchApp.fetch(url, options);
    }
}
