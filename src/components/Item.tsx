import { useChromeStorageSync } from 'use-chrome-storage';
import "../Item.css"

type Props = {
    animeName: string,
}

export default function Item(props: Props) {
    const [{ episode, time }] = useChromeStorageSync(props.animeName, -1);

    const goToAnime = async (event: React.MouseEvent<HTMLElement>) => {
        chrome.tabs.create({ url: `https://animepahe.com/anime?resAnime=${props.animeName}&resEp=${episode}&resTime=${time}` })
    }

    return (
        <div className="container">
            <span>
                {props.animeName + ' ' + episode}
            </span>
            <img
                src="play_button.svg"
                onClick={goToAnime}
            />
        </div>

    );
}
