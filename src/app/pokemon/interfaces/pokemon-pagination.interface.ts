export interface PokemonPagination {
  count: number;
  next: string;
  previous: string | null;
  results: Result[];
}

interface Result {
  name: string;
  url: string;
}
