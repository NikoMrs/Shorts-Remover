if (typeof browser === 'undefined') {
  browser = typeof chrome !== 'undefined' ? chrome : null;
}

let option = {
  hideShortsVideo: true,
  hideShortsResult: true,
  hideShortsFeatured: false,
  hideShortsChannel: true,
  hideShortsHome: true,
  hideShortsFeed: true,
  extensionEnable: true
};

browser.storage.sync.get({list:[]},function(data){
  //alert("Ritirato");
  console.log(data.list);

  let temp = data.list;

  if(temp.length == 0){
    browser.storage.sync.set({list:option}, function(){
      //alert("Disattivato nei Video");
    });
  }
});



/*chrome.storage.sync.set({list:option}, function(){
  //alert("Disattivato nei Video");
});*/


//PROVA PASSAGGIO INFORMAZIONI
//==========================================================
/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "start" ) {
      
      option = request.op;

      console.log(request.op + " CIAO");
    }
  }
);*/
/*chrome.storage.sync.get({list:[]},function(data){
  //alert("Ritirato");
  console.log(data.list);
  option = data.list;
});*/


//==========================================================


// Respond to requests
browser.runtime.onMessage.addListener((data, sender) => {
try {
    const {
      getSettings,
      getFieldsets,
    } = data;

    if(getSettings){
      const { frameId, tab } = sender;


      //PROVA RITIRO INFORMAZIONI
      /*chrome.storage.sync.get({list:[]},function(data){
        //alert("Ritirato");
        console.log(data.list);
        option = data.list;
      });*/



      browser.tabs.sendMessage(tab.id, {option});
    }

} catch (error) {
    console.log(`ERROR: ${error}`);
}
});
