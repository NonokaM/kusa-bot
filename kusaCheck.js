function myFunction() {
    let user = 'NonokaM';
    let git_url = `https://github.com/users/${user}/contributions?from=2023-01-01`;
    let response = UrlFetchApp.fetch(git_url);
    let html = response.getContentText();
    console.log(git_url);
    console.log(html);
    let hasContribution = html.includes("No contributions on Friday, April 21, 2023");
    console.log(hasContribution)
    
    if (hasContribution) {
      console.log("草生えてないよ");
    } else {
      console.log("草生えてるよ");
    }
}
