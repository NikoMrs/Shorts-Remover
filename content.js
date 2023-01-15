if (typeof browser === 'undefined') {
  browser = typeof chrome !== 'undefined' ? chrome : null;
}
  
// Some global constants.
const HTML = document.documentElement;  
  
const resultsPageRegex = new RegExp('.*://.*youtube\.com/results.*', 'i');
const videoPageRegex = new RegExp('.*://.*youtube\.com/*.*/videos.*', 'i'); //PROVA
const featuredPageRegex = new RegExp('.*://.*youtube\.com/c/s*.*/featured.*', 'i');
const channelPageRegex = new RegExp('.*://.*youtube\.com/c/*.*', 'i');
const homepageRegex =    new RegExp('.*://(www|m)\.youtube\.com/$',  'i');
const shortsRegex =      new RegExp('.*://.*youtube\.com/shorts.*',  'i');
const feedPageRegex =    new RegExp('.*://.*youtube\.com/feed.*',  'i');
  
// Dynamic settings variables
let onVideoPage = videoPageRegex.test(location.href);
let onFeaturedPage = featuredPageRegex.test(location.href);
let onChannelPage = channelPageRegex.test(location.href);
let onResultsPage = resultsPageRegex.test(location.href); 
let onHomePage = homepageRegex.test(location.href);
let onFeedPageRegex = feedPageRegex.test(location.href);

//OPZIONI DA BACKGROUND
let option;
  
//URL
let url = location.href;

//ENABLE
let enable;

// Send a "get settings" message to the background script.
browser.runtime.sendMessage({ getSettings: true });

// Update HTML attributes in real time.
//   receive messages from options.js
browser.runtime.onMessage.addListener((data, sender) => {
  const { settings } = data;

  //RICEZIONE DELLE OPZIONI
  option = data.option;
  
  //====================================================================
  /*chrome.storage.sync.get({list:[]},function(d){
    //alert("Ritirato");
    console.log(d.list);
    option = d.list;
  });
  if(option == null){
    console.log("PRUPRU");
    chrome.storage.sync.set({list:data.option}, function(){
      //alert("Disattivato nei Video");
    });
    option = data.option;
  }*/
  //====================================================================

  runDynamicSettings();

  return true;
});


//PROVA RICEZIONE SECONDO MESSAGGIO

//=====================================================================
/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "start" ) {
      
      option = request.op;

      console.log(request.op + " CIAO");
    }
  }
);*/
/*chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [option, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${option}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});*/
//====================================================================
  
// Dynamic settings (i.e. js instead of css)
document.addEventListener("DOMContentLoaded", event => {
  url = undefined;
  counter = 0;
  theaterClicked = false;
  hyper = false;
  originalPlayback = undefined;
  originalMuted = undefined;
  onResultsPage = resultsPageRegex.test(location.href);


  //PROVA
  onVideoPage = videoPageRegex.test(location.href);
  onFeaturedPage = featuredPageRegex.test(location.href);
  onChannelPage = channelPageRegex.test(location.href);
  onHomePage = homepageRegex.test(location.href);
  onFeedPageRegex = feedPageRegex.test(location.href);

  requestRunDynamicSettings()
});
  
  
function runDynamicSettings() {

  // Check if the URL has changed (YouTube is a Single-Page Application)
  if (url !== location.href) {
    url = location.href;
    theaterClicked = false;
    hyper = false;
    originalPlayback = undefined;
    originalMuted = undefined;
    onResultsPage = resultsPageRegex.test(location.href);

    //PROVVISORIO
    onVideoPage = videoPageRegex.test(location.href);
    onFeaturedPage = featuredPageRegex.test(location.href);
    onChannelPage = channelPageRegex.test(location.href);
    onHomePage = homepageRegex.test(location.href);
    onFeedPageRegex = feedPageRegex.test(location.href);

    handleUrlChange();
  }

  //PROVA
  //if(option["extensionEnable"]){
    //console.log("ATTIVO");
  // Hide shorts on the results page
  //console.log(option["extensionEnable"]);
  //=================================================================================
  try {
    if(option["extensionEnable"] == true || option["extensionEnable"] == false){
      enable = option["extensionEnable"];
    }
  } catch (error) {
    
  }
  //==================================================================================

  if(enable){ //PROVA

  if (onResultsPage) {
    const shortResults = Array.from(document.querySelectorAll('a[href^="/shorts/"]:not([marked_as_short])'));
    shortResults.forEach(sr => {
      try {
        if(option["hideShortsResult"]){
          sr.setAttribute('marked_as_short', true);
          const result = sr.closest('ytd-video-renderer');
          result.setAttribute('is_short', true);
          result.style.display = 'none';
        }        
      } catch (error) {
        console.log(error);
      }
    
    })
    

  }

  if (onFeedPageRegex) {
    const shortResults = Array.from(document.querySelectorAll('a[href^="/shorts/"]:not([marked_as_short])'));
    shortResults.forEach(sr => {
      try {
        if(option["hideShortsFeed"]){
          sr.setAttribute('marked_as_short', true);
          const result = sr.closest('ytd-grid-video-renderer');
          result.setAttribute('is_short', true);
          result.style.display = 'none';
        }        
      } catch (error) {
        console.log(error);
      }
    
    })
    

  }

  //PROVA
  if (onVideoPage) {  
    const shortResults = Array.from(document.querySelectorAll('a[href^="/shorts/"]:not([marked_as_short])'));
    shortResults.forEach(sr => {
      try {
        if(option["hideShortsVideo"]){
          sr.setAttribute('marked_as_short', true);
          const result = sr.closest('ytd-grid-video-renderer');
          result.setAttribute('is_short', true);
          result.style.display = 'none';
        }
      } catch (error) {
        //console.log(error);
      }
      
    })
  }

  if (onFeaturedPage) {
    const result = document.querySelector('ytd-reel-shelf-renderer');
    
    try {
      if(option["hideShortsFeatured"]){
        result.setAttribute('is_short', true);
        result.style.display = 'none';
      }
    } catch (error) {
      console.log(error);
    }
      
  }

  if (onChannelPage) {
    const result = document.querySelector('ytd-reel-shelf-renderer');
    
    try {
      if(option["hideShortsChannel"]){
        result.setAttribute('is_short', true);
        result.style.display = 'none';
      }
    } catch (error) {
      //sonsole.log(error);
    }

  }
//HOME
  if (onHomePage) {
    const result = document.querySelector('ytd-rich-section-renderer');
    try {
      if(option["hideShortsHome"]){
        result.setAttribute('is_short', true);
        result.style.display = 'none';
      }
    } catch (error) {
      //sonsole.log(error);
    }

  }

  }//PROVA

  requestRunDynamicSettings()
}
  
  
function handleUrlChange() {

  const currentUrl = location.href;


  //Inserimento attributi nell'HTML della pagina
  HTML.setAttribute('on_video_page', onVideoPage);
  
  //============================================================
  //PROVA
  browser.storage.sync.get({list:[]},function(data){
    //alert("Ritirato");
    console.log(data.list);
    option = data.list;
  });
  //============================================================
}
  
function requestRunDynamicSettings() {
  setTimeout(() => runDynamicSettings(), 50);
}
  