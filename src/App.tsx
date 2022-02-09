import './App.css';
import Item from './components/Item';
import { useChromeStorageSync } from 'use-chrome-storage';

function App() {

  const [list, setList] = useChromeStorageSync('trackingList', []);

  const deleteFromList = (animeName: string) => {
    const newList = list.filter((anime: { name: string, date: Date }) => anime.name !== animeName)
    setList(newList);
  }

  return (<div className='root'>
    {list.map((anime: { name: string, date: Date }) =>
      <Item
        key={anime.name}
        animeName={anime.name}
        deleteFromList={deleteFromList} />
    )}
  </div>)


}

export default App;
