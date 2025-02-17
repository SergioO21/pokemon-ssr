import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokedexComponent } from "./pokedex.component";
import { SimplePokemon } from "../../interfaces";
import { provideRouter } from "@angular/router";

const mockPokemonList: SimplePokemon[] = [
  {
    id: "104",
    name: "cubone",
  },
  {
    id: "21",
    name: "spearow",
  },
];

describe("PokedexComponent", () => {
  let fixture: ComponentFixture<PokedexComponent>;
  let compiled: HTMLElement;
  let component: PokedexComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it("Should create the app", () => {
    fixture.componentRef.setInput("pokemonList", []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("Should render pokemon list correctly", () => {
    fixture.componentRef.setInput("pokemonList", mockPokemonList);
    fixture.detectChanges();

    expect(compiled.querySelectorAll("pokemon-card").length).toBe(
      mockPokemonList.length
    );
  });

  it("Should render 'No Pokémon Matched Your Search!'", () => {
    fixture.componentRef.setInput("pokemonList", []);
    fixture.detectChanges();

    expect(compiled.querySelector("div")?.textContent).toContain(
      "No Pokémon Matched Your Search!"
    );
  });
});
