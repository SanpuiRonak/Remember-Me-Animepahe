console.log("resume script loaded");

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());



if (params.resAnime && params.resEp && params.resTime) {
    const href = document.querySelector(`a[title="${params.resAnime}"]`).href;
    window.location.replace(href + `?resEp=${params.resEp}&resTime=${params.resTime}&page=1`);
}
else if (params.resEp && params.resTime) {

    let playTags;

    const pollTimer = setInterval(() => {
        playTags = document.querySelectorAll('a.play')
        if (playTags.length !== 0) {
            //list loaded
            clearInterval(pollTimer);
            let episodeFound = false;
            playTags.forEach(aTag => {
                //Look for episode span
                if (aTag.innerText.includes(`- ${params.resEp} `)) {
                    console.log("Episode Found");
                    window.location.replace(aTag.href + `?resTime=${params.resTime}`);
                    episodeFound = true;
                }
            })
            //If it does not exsists go to next page
            if (!episodeFound) {
                console.log("going to next page...");
                const nextPageUrl = window.location.href.replace(/page=\d/g, `page=${parseInt(params.page) + 1}`)
                window.location.replace(nextPageUrl);
            }

        }
    }, 1000);

}
else if (params.resTime) {
    const poller = setInterval(() => {
        document.querySelector('iframe').contentWindow.postMessage({ payload: params.resTime, poller }, '*');
    }, 1000)
}

