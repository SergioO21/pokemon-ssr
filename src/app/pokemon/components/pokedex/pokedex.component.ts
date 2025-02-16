import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { SimplePokemon } from "../../interfaces";

@Component({
  selector: "pokedex",
  imports: [PokemonCardComponent],
  templateUrl: "./pokedex.component.html",
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokedexComponent {
  pokemonList = input.required<SimplePokemon[]>();
}
