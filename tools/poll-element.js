/*
Description: Reusable pollElement function to wait until the element is present before performing the callback function.
Technologies: JavaScript 
*/
// selector is an element(s) to be evaluated. pollTime and pollTimeout are in milliseconds, and not required.

function pollElement(selector, callBack, pollTime, pollTimeout){
  pollTime = pollTime || 250;  
  var endTime = Number(new Date()) + (pollTimeout || 5000);
  
  (function poll(){
    if(document.querySelector(selector) != null) callBack();
    else if(Number(new Date()) < endTime) setTimeout(poll, pollTime);    
  })();
}

/*
SAMPLE:
var isElementPresent = $("#element").length > 0;

pollElement("#element", function(){
  // modify code   
});

*/
