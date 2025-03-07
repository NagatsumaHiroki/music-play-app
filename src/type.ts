export type popularSongsList = {
    track:{
        album:{
          artists:[],
          available_markets:[],
          external_urls:object,
          href:string,
          id:number,
          images:[],
          name:string,
          release_date:Date,
          release_date_precision:string,
          total_tracks:number,
        }
    }
  };

  export type SearchSongList = {
    album:{
        artists:[],
        available_markets:[],
        external_urls:object,
        href:string,
        id:number,
        images:[],
        name:string,
        release_date:Date,
        release_date_precision:string,
        total_tracks:number,
    }
  };

  // export type Songs = SearchSongList | popularSongsList;