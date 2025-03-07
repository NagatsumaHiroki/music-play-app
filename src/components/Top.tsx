
import { useEffect, useState } from 'react';
import { SongList } from '../components/SongList'
import {getPopularSongs} from '../api/getPopularSongs'
import { SearchInput } from '../components/SearchInput';
import { searchSongInfo } from '../api/searchSongInfo'

import ScrollToTopButton from './Button/ScrollToTopButton';

import { popularSongsList, SearchSongList  }  from '../type'

function Top() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPoplarSong] = useState<popularSongsList[]>([])
  const [keyword, setKeyword] = useState('');
  const [searchedSongs, setSearchedSongs] = useState<SearchSongList>();
  const isSearchedResult = searchedSongs != null;

  useEffect(() => {
    featchPopularSongs()
  }, [])
  const featchPopularSongs = async () =>{
     setIsLoading(true);
     const result = await getPopularSongs()
     const popularSongs  = result.items.map((item : popularSongsList[])=> {
      return item;
     });
     setPoplarSong(popularSongs);
     setIsLoading(false);
  }
  const handlInputChatnge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const searchSongs = async () => {
    if(keyword == ''){
      setSearchedSongs(undefined)
      featchPopularSongs()
      return;
    }
    setIsLoading(true);
    const params = { keyword }
    const result = await searchSongInfo(params)
    setSearchedSongs(result.items)
    setIsLoading(false);
  }
  const songs = isSearchedResult ?  searchedSongs : popularSongs;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <main className="flex-1 p-8 mb-20">
          <header className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold">
                <a href="/">Music App</a>
            </h1>
          </header>
          <SearchInput onInputChange={handlInputChatnge} onSubmit={searchSongs}/>
          <section>
            <h2 className="text-2xl font-semibold mb-5">{isSearchedResult ? 'Search Reasults':'Popular Songs'}</h2>
            <ScrollToTopButton/>
            <SongList isLoading={isLoading} songs={songs}/>
          </section>
        </main>
      </div>
    </>
  );
}

export default Top;