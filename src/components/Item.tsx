
import { useChromeStorageSync } from 'use-chrome-storage';
import cheerio from 'cheerio';

type Props = {
    animeName: string,
}

export default function Item(props: Props) {
    const [{ episode: episodeNumber }] = useChromeStorageSync(props.animeName, -1);

    const goToAnime = async (event: React.MouseEvent<HTMLElement>) => {
        chrome.tabs.create({ url: `https://animepahe.com/anime?resAnime=${props.animeName}&resEp=${episodeNumber}` })
    }

    return (

        <li>
            {props.animeName + ' ' + episodeNumber}
            <button onClick={goToAnime} >Go</button>
        </li>


    );
}
