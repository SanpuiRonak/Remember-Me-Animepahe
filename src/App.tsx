import './App.css';
import Item from './components/Item';
import { useChromeStorageSync } from 'use-chrome-storage';

function App() {

  const [list] = useChromeStorageSync('trackingList', []);
  return (<ul>
    {list.map((anime: string) =>
      <Item key={anime} animeName={anime} />
    )}
  </ul>)


}

export default App;
