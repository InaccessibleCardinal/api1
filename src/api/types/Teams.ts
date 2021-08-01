export interface Team {
  phone_number: string;
  venue_name: string;
  city: string;
  name_display_full: string;
  league: string;
  league_id: string;
  season: string;
  team_id: string;
  state: string;
  first_year_of_play: string;
  division: string;
  address: string;
}

export interface Player {
  position: string;
  weight: string;
  height: string;
  name: string;
  college: string;
  jersey_number: string;
  name_first: string;
  bats: string;
  height_feet: string;
  height_inches: string;
  pro_debut_date: string;
  birth_date: string;
  throws: string;
  team_name: string;
  player_id: string;
  name_last: string;
  team_id: string;
}
