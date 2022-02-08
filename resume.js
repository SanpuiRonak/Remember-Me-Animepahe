console.log("resume script loaded");

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


if (window.location !== window.parent.location) {

    const vid = document.querySelector('video');

    window.onmessage = (e) => {
        //Send succes to clearInterval
        window.top.postMessage('recieved-time', '*')
        //set time tracker
        vid.currentTime = e.data;
    }
}

else if (params.resAnime && params.resEp && params.resTime) {
    const href = document.querySelector(`a[title="${params.resAnime}"]`).href;


    window.location.replace(href + `?resEp=${params.resEp}&resTime=${params.resTime}`);
}
else if (params.resEp && params.resTime) {

    let playTags;

    const pollTimer = setInterval(() => {
        playTags = document.querySelectorAll('a.play')
        console.log("set", playTags);
        if (playTags.length !== 0) {
            //list loaded
            clearInterval(pollTimer);
            playTags.forEach(aTag => {
                //Look for episode span
                if (aTag.innerText.includes(`- ${params.resEp} `)) {
                    window.location.replace(aTag.href + `?resTime=${params.resTime}`);
                }

            })



        }
    }, 1000);

}
else if (params.resTime) {
    document.querySelector('div.click-to-load').click();
    const poller = setInterval(() => {
        document.querySelector('iframe').contentWindow.postMessage(params.resTime, '*');
    }, 1000)

    window.onmessage = function (e) {
        if (e.data == 'recieved-time') {
            clearInterval(poller);
        }
    };
}

