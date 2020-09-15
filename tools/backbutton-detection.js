/*
Description: Add Back/Forward Detection to trigger an action. Ideal for executing functions when a back/forward button is triggered by the user. This covers all types of devices including mobile.
Technologies: JavaScript 
To test, go to any website and then open console and paste the entire code below. Then click your browser back button.
*/

function initializeBackButtonDetection() {  
  // for older browsers that don't support onhashchange
  ;(function(window) {

    // exit if the browser implements that event
    if ("onhashchange" in window) { return; }

    var location = window.location,
      oldURL = location.href,
      oldHash = location.hash;

    // check the location hash on a 500ms interval
    setInterval(function() {
      var newURL = location.href,
        newHash = location.hash;

      // if the hash has changed and a handler has been bound...
      if (newHash != oldHash && typeof window.onhashchange === "function") {
        // execute the handler
        window.onhashchange({
          type: "hashchange",
          oldURL: oldURL,
          newURL: newURL
        });

        oldURL = newURL;
        oldHash = newHash;
      }
    }, 500);

  })(window);
  
  // to prevent back button -- inject a hash in the URL then have it poll to listen when it is not present.

  var currentState = "#backbuttonarmed";
  if (!window.location.hash.includes(currentState)) window.location.hash += currentState;
  
  window.onhashchange = function(){
    if (!window.location.hash.includes(currentState)) {
      triggerAction();
    }
  };

  // Since this is an SPA, we need to use pushState and popState to determine page changes.
  // applying page check on OnPopState. This is for browser back and forward detection   
  setTimeout(
    function(){
      window.onpopstate = function(e){ 
        e.preventDefault();
        triggerAction();
      };
    },500
  );
}

function triggerAction(){
  var msg = "Back Button has been detected.";
  console.warn(msg);
  alert(msg)
}

setTimeout(initializeBackButtonDetection, 250);