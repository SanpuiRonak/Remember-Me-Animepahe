const h1 = document.querySelector('h1');
console.log(h1);


// if on any episode or on anime home page 
if (h1) {

    let title = h1.outerText.split('\n')[1];

    if (title !== undefined) {
        //episode page
        const [animeName, animeEp] = title.split(' - ');
        console.log("episode page", animeName, animeEp);

        chrome.storage.sync.set({ animeName: parseInt(animeEp) }, () => {
            console.log("override " + animeName + " to " + animeEp);
        })

        chrome.storage.sync.get({ 'trackingList': [] }, ({ trackingList }) => {

            const newList = trackingList;
            const isPresent = trackingList.find((name: string) => name === animeName);

            if (isPresent) return;

            newList.push(animeName);
            console.log(newList);

            chrome.storage.sync.set({ 'trackingList': newList }, () => {
                console.log("pushed " + animeName);
            })
        })
    }
}




