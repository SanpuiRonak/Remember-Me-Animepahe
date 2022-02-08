console.log("epsiode tracker loaded");

//Code to run in iframe
if (window.location !== window.parent.location) {

    const vid = document.querySelector('video');
    console.log("iframe");
    let animeName = null;

    window.onmessage = (e) => {
        //Send succes to clearInterval
        console.log(e.data);
        window.top.postMessage(e.data.poller, "*")
        debugger
        if (!isNaN(e.data.payload)) {
            vid.currentTime = e.data.payload;
        }
        else {

            animeName = e.data.payload;
            console.log("recieved", e.data);
            //set time tracker
            chrome.storage.sync.get([animeName], (anime) => {
                setInterval(() => {
                    //update the time
                    // debugger;
                    console.log("tracker", vid, anime);

                    anime[animeName].time = vid.currentTime;
                    chrome.storage.sync.set({ [animeName]: anime[animeName] });
                }, 5000)
            });
        }

    }
}

const h1 = document.querySelector('h1');

// if on any episode or on anime home page 
if (h1) {

    let title = h1.outerText.split('\n')[1];

    if (title !== undefined) {
        //get @animeName and @animeEp
        const [animeName, animeEp] = title.split(' - ');



        document.querySelector('iframe').contentWindow.postMessage(animeName, '*')

        //override @animeName and @animeEp to chrome storage
        chrome.storage.sync.set({ [animeName]: { episode: parseInt(animeEp), time: 0 } }, () => {
            console.log("override " + animeName + " to " + animeEp);
        })

        //add @animeName to tarckingList
        chrome.storage.sync.get({ 'trackingList': [] }, ({ trackingList }) => {

            const newList = trackingList;
            const isPresent = trackingList.find((name) => name === animeName);

            if (isPresent) return;

            newList.push(animeName);
            console.log(newList);

            chrome.storage.sync.set({ 'trackingList': newList }, () => {
                console.log("pushed " + animeName);
            })
        })

        //In kwikz iframe tarck current time

        const poller = setInterval(() => {
            document.querySelector('iframe').contentWindow.postMessage({ payload: animeName, poller }, '*');
            console.log("polling, eT");
        }, 1000)
        window.onmessage = (e) => {
            console.log("clearing, ", e.data);

            if (!isNaN(e.data)) {
                clearInterval(e.data);
            }
        }

    }
}





