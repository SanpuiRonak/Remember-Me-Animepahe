console.log("resume script loaded");

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (params.resAnime && params.resEp) {
    const href = document.querySelector(`a[title="${params.resAnime}"]`).href;


    window.location.replace(href + `?resEp=${params.resEp}`);
}
else if (params.resEp) {

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
                    window.location.replace(aTag.href);
                }

            })



        }
    }, 1000);

}

