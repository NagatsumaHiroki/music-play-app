import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon }from '@fortawesome/react-fontawesome'
import { FC } from 'react';
import { popularSongsList, SearchSongList  }  from '../type'
import React from 'react';

interface ListParam {
  isLoading: boolean,
  songs: popularSongsList[] | SearchSongList
}

export const SongList: FC<ListParam> = ({ isLoading, songs}) => {
    if (isLoading)
      return (
        <div className="inset-0 flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      );
    return (
    
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
      {/* ここ見直し */}
      {Object.entries(songs).map(([id, song]) => (
        <React.Fragment key={id}>
        <a
          href={song.track ? song.track.external_urls.spotify : song.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-node cursor-pointer"
          key={song.track ? song.track.id : song.id}
       >
        <img
          alt="thumbnail"
          src={song.track ? song.track.album.images[0]?.url : song.album.images[0]?.url}
          className="mb-2 rounded"
        />
        <h3 className="text-lg font-semibold">
          {song.track ? song.track.name : song.name}
        </h3>
        <p className="text-gray-400">
          {song.track ? song.track.artists[0]?.name : song.artists[0]?.name}
        </p>
      </a>
      </React.Fragment>
      ))}
    </div>
  );
}