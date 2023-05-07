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
