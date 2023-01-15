let op = {
    hideShortsVideo: true,
    hideShortsResult: true,
    hideShortsFeatured: false,
    hideShortsChannel: true,
    hideShortsHome: true,
    hideShortsFeed: true,
    extensionEnable: true
};
//CI VUOLE UNA FUNZIONE PER LEGGERE LO STORAGE ALL'AVVIO  
function retriveData(){
    //INSERIMENTO INFORMAIZONI
    
    chrome.storage.sync.get({list:[]},function(data){
        op = data.list;
        document.getElementById("hideShortsVideo").checked = op["hideShortsVideo"];
        document.getElementById("hideShortsResult").checked = op["hideShortsResult"];
        document.getElementById("hideShortsChannel").checked = op["hideShortsChannel"];
        document.getElementById("hideShortsHome").checked = op["hideShortsHome"];
        document.getElementById("hideShortsFeed").checked = op["hideShortsFeed"];
        document.getElementById("extensionEnable").checked = op["extensionEnable"];

        //IJIJIJIJIJIJ
        changeEnable();
        
    });

    //PROVA
    //updateData();

    //alert("ciao = " + op["extensionEnable"]);

    //changeEnable();
}


function updateData(){

    //VISITA DI TUTTI I TOGGLE
    let shortVideo = document.getElementById("hideShortsVideo");
    let shortResult = document.getElementById("hideShortsResult");
    let shortChannel = document.getElementById("hideShortsChannel");
    let shortHome = document.getElementById("hideShortsHome");
    let shortFeed = document.getElementById("hideShortsFeed");
    let enable = document.getElementById("extensionEnable");

    //MODIFICA DI OP
    op["hideShortsVideo"] = shortVideo.checked;
    op["hideShortsResult"] = shortResult.checked;
    op["hideShortsChannel"] = shortChannel.checked;
    op["hideShortsHome"] = shortHome.checked;
    op["hideShortsFeed"] = shortFeed.checked;
    op["extensionEnable"] = enable.checked;

    //PROVA
    //changeEnable();

    chrome.storage.sync.set({list:op}, function(){
        //alert("Disattivato nei Video");
    });

    //GET CURRENT TAB -- PROVA 
    var tab = getCurrentTabUrl();
    getCurrentTabUrl().then(url => {
        
        /*if (/www.youtube.com/.test(window.location.href)){
            alert("CIAO");
        }*/
        if(url.includes("www.youtube.com")){
            //alert("YOUTUBE");
            //Reload if i'm on youtube website
            chrome.tabs.reload();
        }
    });

    
}

function changeEnable(){
    let shortVideo = document.getElementById("hideShortsVideo");
    let shortResult = document.getElementById("hideShortsResult");
    let shortChannel = document.getElementById("hideShortsChannel");
    let shortHome = document.getElementById("hideShortsHome");
    let shortFeed = document.getElementById("hideShortsFeed");
    let enable = document.getElementById("extensionEnable");

    let firstDiv = document.getElementById("firstDiv");
    
    //alert(op["extensionEnable"]);

    if(op["extensionEnable"] == true){
        shortVideo.disabled = false;
        shortResult.disabled = false;
        shortChannel.disabled = false;
        shortHome.disabled = false;
        shortFeed.disabled = false;

        firstDiv.style.backgroundColor = 'white';
        firstDiv.style.opacity = 1;

        //chrome.browserAction.setIcon({ path: "Icons/off_icon16.png" });
        chrome.action.setIcon({
            path: {
                "16": "/Icons/on_icon16.png",
                //"32": "/Icons/on_icon32.png",
                //"48": "/Icons/on_icon48.png",
                //"128": "/Icons/on_icon128.png"
            }
        });

    }else{
        shortVideo.disabled = true;
        shortResult.disabled = true;
        shortChannel.disabled = true;
        shortHome.disabled = true;
        shortFeed.disabled = true;

        firstDiv.style.backgroundColor = 'Gray';
        firstDiv.style.opacity = .5;

        chrome.action.setIcon({
            path: {
                "16": "/Icons/off_icon16.png",
                //"32": "/Icons/off_icon32.png",
                //"48": "/Icons/off_icon48.png",
                //"128": "/Icons/off_icon128.png"
            }
        });
    }
    
    //alert(enable.checked);
}

//PROVA
async function getCurrentTabUrl() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.url
}

//UpdateData
document.getElementById("hideShortsVideo").addEventListener('change',updateData);
document.getElementById("hideShortsResult").addEventListener('change',updateData);
document.getElementById("hideShortsChannel").addEventListener('change',updateData);
document.getElementById("hideShortsHome").addEventListener('change',updateData);
document.getElementById("hideShortsFeed").addEventListener('change',updateData);
document.getElementById("extensionEnable").addEventListener('change',updateData);

//Enable/Disable
document.getElementById("extensionEnable").addEventListener('change',changeEnable);


//Apertura del popup
window.addEventListener('DOMContentLoaded',retriveData);
//window.addEventListener('DOMContentLoaded',changeEnable);
