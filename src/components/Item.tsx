
type Props = {
    animeName: string,
}

export default function Item(props: Props) {
    return (
        <li>
            {props.animeName}
        </li>
    );
}
