import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pokemon, PokemonPagination, SimplePokemon } from "../interfaces";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = "https://pokeapi.co/api/v2/pokemon";

  loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http
      .get<PokemonPagination>(this.baseUrl, {
        params: {
          offset: page * 20,
          limit: 20,
        },
      })
      .pipe(
        map((res) => {
          const simplePokemon: SimplePokemon[] = res.results.map((pokemon) => ({
            id: pokemon.url.split("/").at(-2) ?? "",
            name: pokemon.name,
          }));

          return simplePokemon;
        })
      );
  }

  loadPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${id}`);
  }
}
