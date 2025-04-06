  export interface creator {
    name: string,
    profile_path: string 
  }
  export interface genre {
      id: number,
      name:string
  }
  export interface episode {
    id: number,
    name: string,
    overview: string,
    vote_average: number,
    vote_count:number,
    air_date: Date,
    episode_number: number,
    episode_type: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path:string
  }
  export interface network{
    id: number,
    logo_path: string,
    name: string,
    origin_country: string,
  }
  export interface spoken_language{
    english_name: string,
    iso_639_1: string,
    name: string
  }
  export interface   production_company {
      id: number,
      logo_path: string,
      name: string,
      origin_country: string
    }
  export interface production_country
    {
      iso_3166_1:string,
      name: string
    }
    export interface session
      {
        air_date: Date,
        episode_count: number,
        id: number,
        name: string,
        overview: string,
        poster_path: string,
        season_number: number,
        vote_average: number
      }
  export interface TVshow {
    id: number,
    name: string,
    overview: string
    poster_path: string,
    vote_average: number,

    first_air_date: Date,
    seasons: number,
    episodes: number,
    status: string,
    tagline: string,
    homepage: string,
    created_by?: creator[],
    adult: boolean,
    backdrop_path: string, 
     episode_run_time: number[],
     genres:genre[],
     in_production: boolean,
     languages:string[]
     last_air_date: Date,
     last_episode_to_air:episode,
     next_episode_to_air:episode,
     networks:network[],

     type: string,
     vote_count: number,
     spoken_languages: spoken_language[],
     number_of_episodes: number,
     number_of_seasons: number,
     origin_country:string [],

     original_language: string,
     original_name: string,
     popularity:number,
     production_companies: production_company[],
     production_countries: production_country[],
     
  sessons: session[],
  
  }