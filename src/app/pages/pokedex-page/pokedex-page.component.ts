import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { PokedexComponent } from "../../pokemon/components/pokedex/pokedex.component";
import { PokemonService } from "../../pokemon/services";
import { SimplePokemon } from "../../pokemon/interfaces";
import { ActivatedRoute, Router } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, tap } from "rxjs";
import { Title } from "@angular/platform-browser";
import { PokedexSkeletonComponent } from "./ui/pokedex-skeleton/pokedex-skeleton.component";

@Component({
  selector: "pokedex-page",
  imports: [PokedexComponent, PokedexSkeletonComponent],
  templateUrl: "./pokedex-page.component.html",
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokedexPageComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  pokemon = signal<SimplePokemon[]>([]);
  currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get("page") ?? "1"),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    ),
    { initialValue: 1 }
  );

  ngOnInit() {
    this.route.queryParams.subscribe();
    this.loadPokemon();
  }

  loadPokemon(page = 0) {
    const pageToLoad = this.currentPage() + page;

    if (pageToLoad === 0) return;

    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ),
        tap(() => this.title.setTitle(`Pokedex - Page ${pageToLoad}`))
      )
      .subscribe((pokemon) => {
        this.pokemon.set(pokemon);
      });
  }
}
