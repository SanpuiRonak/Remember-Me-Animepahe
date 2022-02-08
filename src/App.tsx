import './App.css';
import Item from './components/Item';
import { useChromeStorageSync } from 'use-chrome-storage';

function App() {

  const [list] = useChromeStorageSync('trackingList', []);
  return (<div className='root'>
    {list.map((anime: { name: string, date: Date }) =>
      <Item key={anime.name} animeName={anime.name} />
    )}
  </div>)


}

export default App;
