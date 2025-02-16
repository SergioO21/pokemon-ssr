import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from "@angular/core";
import { PokedexComponent } from "../../pokemon/components/pokedex/pokedex.component";
import { PokemonService } from "../../pokemon/services";
import { SimplePokemon } from "../../pokemon/interfaces";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, tap } from "rxjs";
import { Title } from "@angular/platform-browser";
import { PokedexSkeletonComponent } from "./ui/pokedex-skeleton/pokedex-skeleton.component";

@Component({
  selector: "pokedex-page",
  imports: [PokedexComponent, PokedexSkeletonComponent, RouterLink],
  templateUrl: "./pokedex-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokedexPageComponent {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  firstPage = computed(() => 1);
  lastPage = computed(() => 66);
  pokemon = signal<SimplePokemon[]>([]);
  currentPage = toSignal(
    this.route.params.pipe(
      map((params) => params["page"] ?? "1"),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    ),
    { initialValue: 1 }
  );

  loadOnPageChanged = effect(() => {
    this.loadPokemon();
  });

  loadPokemon() {
    if (
      this.currentPage() < this.firstPage() ||
      this.currentPage() > this.lastPage()
    ) {
      void this.router.navigate(["/pokedex/page", 1]);
    }

    this.pokemonService
      .loadPage(this.currentPage())
      .pipe(
        tap(() => this.title.setTitle(`Pokedex - Page ${this.currentPage()}`))
      )
      .subscribe((pokemon) => {
        this.pokemon.set(pokemon);
      });
  }
}
