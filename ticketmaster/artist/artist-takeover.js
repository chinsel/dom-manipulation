/*
Description: Page Takeover Modal for Taylor Swift on responsive SPA page for all types of devices.
Technologies: Pure JavaScript, DOM Manipulation by appending a Taylor Swift custom modal dialog.
To test, go to https://www.ticketmaster.com/taylor-swift-tickets/artist/1094215 and then open console and paste the entire code below.
*/

(function() {

  function addCSS() {
    var styleNode = document.createElement("style");
    styleNode.id = "custom-modal-css";
    styleNode.innerHTML = 
    'html, body { overflow: hidden !important }' +
    '.flex-grow { flex-grow: 1; }' +
    '.promo-content {' +
      'display: block;' +
      'text-align: center;' +
      'padding: 0 8px;' +
    '}' +
   '.promo-content__header {' +
      'display: block;' +
      'font-size: 32px;' + 
      'margin: 8px 0;' +
    '}' + 
    '.promo-content__venue-container {' +
      'display: flex;' + 
      'margin-bottom: 16px;' +
    '}' + 
    '.promo-content__cta-container {' +
      'padding: 0 8px;' + 
      'margin: 8px 0 24px;' +
    '}' +
    '.promo-image-item {' +
      'filter: none;' + 
      'transition: filter 80ms linear 0s;' +
      'width: 100%;' +
      'max-width: 480px;' +
    '}' +
    '.promo-venue-item-left { padding-right: 16px; text-align: right; }' +
    '.promo-venue-item-right { padding-left: 16px; text-align: left; }' +
    '.promo-venue-item-border { border-right: 1px solid #ebebeb; }' + 
    '.promo-item-date, .promo-item-venue, .promo-item-city { white-space: nowrap; }' +
    '.promo-item-date {' +
      'font-size: 14px;' +
      'color: #904eba;' +
      'font-weight: bold;' +
    '}' +
    '.promo-item-venue {' +
      'font-size: 14px;' +
      'color: #262626;' +
      'font-weight: bold;' +
      'margin-top: 10px;' +
    '}' +
    '.promo-item-city {' +
      'font-size: 12px;' +
      'color: #262626;' +
      'font-weight: normal;' +
    '}' +
    '.promo-content__venue-container {padding: 16px 10px 16px;}' + 
    '.promo-content__cta-container p { font-size: 16px; margin-bottom: 8px; }' +
    '.promo-content__cta-note, .promo-endnote { font-size: 12px; }' +
    '.lightbox-close {' +
      'position: absolute;' +
      'right: 0;' +
      'top: 0;' +
      'height: 60px;' +
      'width: 60px;' +
      '-webkit-appearance: none !important;' +
      'border: none;' +
      'cursor: pointer;' +
    '}' +
    
    '.lightbox-button {' + 
      'font-weight: 600;' +
      'font-size: 12px;' +
      'line-height: 18px;' +
      'width: auto;' +
      'min-width: 60px;' +
      'text-align: center;' +
      'cursor: pointer;' +
      'color: #fff;' +
      'background-color: #026cdf;' +
      'display: block;' +
      'padding: 10px 12px;' +
      'border-radius: 2px;' +
      'border: 1px solid transparent;' +
      'transition: background-color 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s;' +
      'text-decoration: none;' +
    '}' +
    '.lightbox-button:hover { background-color: #0150a7; }' +
    '.lightbox-button:active { ' +
      'transform: scale(0.98, 0.98) translate(0px, 1px);' +
    '}' +
    '.lightbox-button-outline {' + 
      'color: #026cdf;' +
      'background-color: transparent;' +
      'border: 1px solid #026cdf;' +
    '}' +
    '.lightbox-button.lightbox-button-outline:hover {' +
      'background-color: #d6e7fa;' +
    '}' +
    '.lightbox-overlay {' +
      'height: 100%;' +
      'width: 100%;' +
      'position: fixed;' +
      'left: 0;' +
      'top: 0;' +
      'background-color: rgba(38, 38, 38, 0.65);' +
      'z-index: 9;' +
      'display: block;' +
      'transition: opacity 0.1s cubic-bezier(0.55, 0.085, 0.68, 0.53) 0s;' +
    '}' +
    '.lightbox-container {' + 
      'display: block;' +
      'top: 50%;' +
      'margin-top: 0;' + 
      'margin-left: 16px;' +
      'margin-right: 16px;' +
      'position: relative;' +
      'transform: translateY(-50%);' +
      'z-index: 9;' +
      'background-color: #fff;' +
      'box-shadow: rgba(0,0,0,0.06) 0 16px 16px 0, rgba(0,0,0,0.12) 0 0 16px 0;' +
      'border-radius: 4px;' +
      'height: auto;' +
      'padding: 60px 0 32px;' +
      'overflow: hidden;' +
      'transition: opacity 0.1s cubic-bezier(0.55, 0.085, 0.68, 0.53) 0s, transform 0.1s cubic-bezier(0.55, 0.085, 0.68, 0.53) 0s;' +
    '}' +
    '.lightbox-content {' +
      'padding: 0 10px;' +
      'max-height: calc(100vh - 176px);' +
      'overflow-y: auto;' +
      'overflow-x: hidden;' + 
      '-webkit-overflow-scrolling: touch;' +
      'background-color: #fff;' +
    '}' +
    '.lightbox-scrollbox-onscroll {' +
      'content: "";' +
      'position: sticky;' +
      'z-index: 1;' +
      'top: -10px;' +
      'height: 7px;' +
      'display: block;' +
      'box-shadow: rgba(0, 0, 0, 0.5) 0px 6px 11px 0;' +
    '}' +
    '@media screen and (min-width: 375px) {' +
      '.lightbox-container { max-width: 360px; margin-left: auto; margin-right: auto;}' +
      '.lightbox-button { font-size: 14px; }' +
      '.lightbox-content { padding: 0 32px; }' +
      '.promo-item-date, .promo-item-venue { font-size: 16px; }' +
      '.promo-item-city { font-size: 14px; }' +
      '.promo-content__cta-note, .promo-endnote { font-size: 14px; }' +
      '.promo-image { padding: 0; }' +  
      '.promo-content, .promo-content__venue-container, .promo-content__cta-container { padding-left: 0; padding-right: 0; }' +
    '}' +
    '@media screen and (min-width: 480px) {' +
      '.lightbox-container { max-width: 440px; }' +
    '}' +
    '@media screen and (min-width: 1024px) {' +
      '.lightbox-content { display: flex; flex-direction: row; }' +
      '.lightbox-container { max-width: 770px; }' +
      '.promo-content__cta-container > p { font-size: 16px; }' +
      '.promo-image, .promo-content { padding-left: 8px; padding-right: 8px; }' +
      '.promo-content__venue-container {padding: 0 0 16px;}' + 
      '.lightbox-scrollbox-onscroll { display: none }' +
    '}';
    document.head.appendChild(styleNode);  
  }

  function injectModal(){
    var rsvpLink = 'https://verifiedfan.ticketmaster.com/taylorswifttix';
    var rsvpLink2 = 'https://verifiedfan.ticketmaster.com/taylorswifttix2';
    var promoImageSrc = 'https://sb.monetate.net/img/1/735/2362088.jpg';
    var closeImage = '<svg title="Close" viewBox="0 0 12 12" width="16" height="16" fill="#000000"><path d="M6.563 6.203l4.523 4.516a.384.384 0 0 1 .117.281c0 .11-.039.203-.117.281a.378.378 0 0 1-.137.09.417.417 0 0 1-.297 0 .378.378 0 0 1-.136-.09L6 6.766 1.484 11.28a.378.378 0 0 1-.136.09.417.417 0 0 1-.297 0 .378.378 0 0 1-.137-.09A.384.384 0 0 1 .797 11c0-.11.039-.203.117-.281l4.524-4.516L.913 1.68a.384.384 0 0 1-.117-.282c0-.109.039-.203.117-.28A.388.388 0 0 1 1.2 1c.112 0 .207.04.285.117L6 5.633l4.516-4.516A.388.388 0 0 1 10.8 1c.112 0 .207.04.285.117a.384.384 0 0 1 .117.281c0 .11-.039.204-.117.282L6.562 6.203z"></path></svg>';
    var lightbox = document.createElement("div");
    lightbox.id = "custom-modal-html";
    lightbox.className = "lightbox-overlay";
    lightbox.innerHTML =     
    '<div class="lightbox-container">' +
      '<button type="button" class="lightbox-close">' + closeImage + '</button>' +
      '<div class="lightbox-content">' +
        '<div class="lightbox-scrollbox-onscroll" style="display: none"></div>' +
        '<div class="promo-image flex-grow"><a href="' + rsvpLink + '" target="_self"><img src="' + promoImageSrc + '" alt="Taylor Swift" title="" class="promo-image-item" /></a></div>' +
        '<div class="promo-content flex-grow">' + 
          '<div class="promo-content__venue-container">' +
            '<div class="promo-venue-item flex-grow promo-venue-item-left promo-venue-item-border">' + 
              '<div class="promo-item-date">July 25, 2020</div>' + 
              '<div class="promo-item-date">July 26, 2020</div>' + 
              '<div class="promo-item-venue">SoFi Stadium</div>' +
              '<div class="promo-item-city">Los Angeles, CA</div>' +
            '</div>' +
            '<div class="promo-venue-item promo-venue-item-right flex-grow">' + 
              '<div class="promo-item-date">July 31, 2020</div>' + 
              '<div class="promo-item-date">August 1, 2020</div>' + 
              '<div class="promo-item-venue">Gillette Stadium</div>' +
              '<div class="promo-item-city">Foxborough, MA</div>' +
            '</div>' +
          '</div>' +
          '<div class="promo-content__cta-container">' +
            '<p>Already a Taylor Swift Tix Verified Fan? Click below.</p>'+
            '<a href="' + rsvpLink + '" target="_self" class="lightbox-button">RSVP Today</a>' +
          '</div>' +
          '<div class="promo-content__cta-container">' +
            '<p>Not a Verified Fan?</p>'+
            '<a href="' + rsvpLink2 + '" target="_self" class="lightbox-button lightbox-button-outline">Register Today</a>' +
          '</div>' +
          '<p class="promo-endnote">RSVP and Registration closes Monday, October 7 at 11:59p.m. PT</p>' +
        '</div>' +
       
      '</div>' +
    '</div>';

    document.body.appendChild(lightbox);

    var closeBox = document.querySelector(".lightbox-close");
    closeBox.addEventListener("click", removeModal);

    // scroll to the top position when if scroll overflow is present
    var lightboxContent = document.querySelector(".lightbox-content");
    lightboxContent.scrollTop = 0 - lightboxContent.scrollHeight;

    lightboxContent.addEventListener("scroll", function(){
      var isScrolling = this.scrollTop >= 20;
      var lightboxScrollShade = document.querySelector(".lightbox-scrollbox-onscroll");

      if(isScrolling) {
        lightboxScrollShade.style.display = "block";
      }
      else lightboxScrollShade.style.display = "none";
    });
  }
  
  function removeModal(){
    // if modal already exists remove them
    var modalHTML = document.getElementById("custom-modal-html");
    var modalCSS = document.getElementById("custom-modal-css");
    var isModalPresent = (modalHTML !== null) && (modalCSS !== null);
    
    if(isModalPresent) {
      modalCSS.remove();
      modalHTML.remove();
    };
    
  }
  function init(){
    removeModal();    
    addCSS();
    injectModal();
  }

  init();
})();