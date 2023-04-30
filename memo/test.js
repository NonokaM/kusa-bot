function doDo() {
  function saveText(text) {
    var properties = PropertiesService.getUserProperties();
    properties.setProperty('myText', text);
  }

  function getText() {
    var properties = PropertiesService.getUserProperties();
    var text = properties.getProperty('myText');
    console.log(text);
  }

  function test() {
    var text = 'Hello World!';
    saveText(text);
    getText();
  }

  test();
}
