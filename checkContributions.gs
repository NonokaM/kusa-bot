const githubOAuthToken = 'GITHUB_OAUTH_TOKEN';


function checkContributions() {
  let formattedDate = new Date().toISOString().split('T')[0] + "T00:00:00Z";
  let contributionsMessage = '';
  let properties = PropertiesService.getUserProperties();
  let userName = properties.getProperty('userNameKey');

  let graphqlQuery = JSON.stringify({
    query: `
      {
        user(login: "${userName}") {
          contributionsCollection(from: "${formattedDate}", to: "${formattedDate}") {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `
  });

  let options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: "bearer " + gitToken
    },
    payload: graphqlQuery
  };

  let response = UrlFetchApp.fetch('https://api.github.com/graphql', options);
  let jsonResponse = JSON.parse(response.getContentText());
  let hasContributions = jsonResponse.data.user.contributionsCollection.contributionCalendar.totalContributions > 0;

  if (hasContributions) {
    contributionsMessage = '草生えてるよ';
  } else {
    contributionsMessage = '草生えてないよ';
  }

  return contributionsMessage;
}
