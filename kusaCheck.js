function myFunction() {

  const formattedDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  console.log(formattedDate); // No contributions on Thursday, June 1, 2023

  let user = 'NonokaM';
  let git_url = `https://github.com/users/${user}/contributions?from=2023-01-01`;
  let response = UrlFetchApp.fetch(git_url);
  let html = response.getContentText();
  let hasContribution = html.includes(`No contributions on ${formattedDate}`);
  console.log(hasContribution)
  
  if (hasContribution) {
    console.log("草生えてないよ");
  } else {
    console.log("草生えてるよ");
  }
}
