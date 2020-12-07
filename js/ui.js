/* function to generate division*/
  function createDiv()
  {
    var div =  document.createElement("div");
    return div;
  }
/*function to create heading*/
  function createHeading(tiltleText){
    var element = document.createElement("h1");
    document.body.appendChild(element);
    var textNode = document.createTextNode(tiltleText);
    element.appendChild(textNode);
  }
//function to create paragraph
  function createParagraph(tiltleText){
    var element = document.createElement("p");
    var textNode = document.createTextNode(tiltleText);
    element.appendChild(textNode);
    return element;
  }
//function to create button
  function createButton(buttonText){
    console.log("Creating a Button: " + buttonText);
     var element = document.createElement("BUTTON");
     var span = document.createElement("span")
     var text = document.createTextNode(buttonText);
     span.appendChild(text);
     element.appendChild(span);
     return element;
  }
//function to create audio
function createAudio(AudioUrl){
  var element = new Audio(AudioUrl);
  return element;
}
