import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Pokemon, PokemonPagination, SimplePokemon } from "../interfaces";
import { catchError, map, Observable, throwError } from "rxjs";

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
    return this.http
      .get<Pokemon>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error occurred", error);
    } else {
      console.error(`Error code: ${error.status}`, error);
    }

    const errorMessage = error.error ?? "An error occurred";

    return throwError(() => new Error(errorMessage));
  }
}
