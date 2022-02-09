import { useChromeStorageSync } from 'use-chrome-storage';
import "../Item.css"

type Props = {
    animeName: string,
    deleteFromList: (animeName: string) => void
}

export default function Item(props: Props) {
    const [{ episode, time }, setValue] = useChromeStorageSync(props.animeName, -1);

    const goToAnime = (event: React.MouseEvent<HTMLElement>) => {
        window.open(`https://animepahe.com/anime?resAnime=${props.animeName}&resEp=${episode}&resTime=${time}`, '_blank')
    }

    const delAnime = () => {
        props.deleteFromList(props.animeName)
        chrome.storage.sync.remove(props.animeName)
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
            <img
                src="cancel_button.svg"
                onClick={delAnime}
            />
        </div>

    );
}
