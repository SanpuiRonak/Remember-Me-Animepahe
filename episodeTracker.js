console.log("epsiode script loaded");

const syncTime = (vid, animeName) => {
    if (!vid) {
        console.log("vid not found");
        vid = document.querySelector('iframe').contentWindow;
        console.log("loop", vid);
    }
    // chrome.storage.sync.get([animeName], anime => {
    //     console.log("time:", anime);
    // })
}



    ;
const h1 = document.querySelector('h1');
let vid = null;
console.log(vid);


// if on any episode or on anime home page 
if (h1) {

    let title = h1.outerText.split('\n')[1];

    if (title !== undefined) {
        //get @animeName and @animeEp
        const [animeName, animeEp] = title.split(' - ');
        console.log("episode page", animeName, animeEp);

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
        console.log("set interval");
        setInterval(() => { syncTime(vid, animeName) }, 1000);
    }
}





