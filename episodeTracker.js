console.log("epsiode tracker loaded");

//Code to run in iframe
if (window.location !== window.parent.location) {

    const vid = document.querySelector('video');
    let animeName = null;

    window.onmessage = (e) => {
        //Send succes to clearInterval
        window.top.postMessage(e.data.poller, "*")

        if (!isNaN(e.data.payload)) {
            vid.currentTime = e.data.payload;
        }
        else {

            animeName = e.data.payload;
            //set time tracker
            chrome.storage.sync.get([animeName], (anime) => {
                setInterval(() => {
                    //update the time
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
        chrome.storage.sync.set({ [animeName]: { episode: parseInt(animeEp), time: 0 } })

        //add @animeName to tarckingList
        chrome.storage.sync.get({ 'trackingList': [] }, ({ trackingList }) => {

            const newList = trackingList.filter(({ name }) => name !== animeName);

            newList.push({ name: animeName, date: Date.now() });

            newList.sort((a, b) => b.date - a.date)

            chrome.storage.sync.set({ 'trackingList': newList })
        })

        const poller = setInterval(() => {
            document.querySelector('iframe').contentWindow.postMessage({ payload: animeName, poller }, '*');
        }, 1000)

        //clear the setInterval 
        window.onmessage = (e) => {
            if (!isNaN(e.data)) {
                clearInterval(e.data);
            }
        }

    }
}





