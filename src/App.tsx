import './App.css';
import Item from './components/Item';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useChromeStorageSync } from 'use-chrome-storage';

function App() {
  const [list, setList] = useChromeStorageSync('trackingList', []);

  return (<ul>
    {list.map((anime: string) =>
      <Item key={anime} animeName={anime} />
    )}
  </ul>)


}

export default App;
