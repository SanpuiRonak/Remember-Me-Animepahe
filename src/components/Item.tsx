
import { useChromeStorageSync } from 'use-chrome-storage';
import cheerio from 'cheerio';

type Props = {
    animeName: string,
}

export default function Item(props: Props) {
    const [{ episode, time }] = useChromeStorageSync(props.animeName, -1);

    const goToAnime = async (event: React.MouseEvent<HTMLElement>) => {
        chrome.tabs.create({ url: `https://animepahe.com/anime?resAnime=${props.animeName}&resEp=${episode}&resTime=${time}` })
    }

    return (

        <li>
            {props.animeName + ' ' + episode}
            <button onClick={goToAnime} >Go</button>
        </li>


    );
}
