// 関数が実行されたとき、その日、Githubに草が生えているか否か判別する


function checkContributions() {
    const formattedDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    console.log(formattedDate); // No contributions on Thursday, June 1, 2023

    let contributionsMessage = '';
    let user = 'NonokaM';
    let git_url = `https://github.com/users/${user}/contributions`; // ?from=2023-01-01
    let response = UrlFetchApp.fetch(git_url);
    let html = response.getContentText();
    let hasContributions = html.includes(`No contributions on ${formattedDate}`);
    console.log(hasContributions)

    if (hasContributions) {
      console.log("草生えてないよ");
      contributionsMessage = '草生えてないよ';
    } else {
      console.log("草生えてるよ");
      contributionsMessage = '草生えてるよ';
    }

    return contributionsMessage;
  }
