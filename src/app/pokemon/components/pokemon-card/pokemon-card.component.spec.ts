import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonCardComponent } from "./pokemon-card.component";
import { provideRouter } from "@angular/router";
import { SimplePokemon } from "../../interfaces";

const mockPokemon: SimplePokemon = {
  id: "104",
  name: "cubone",
};

describe("PokemonCardComponent", () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput("pokemon", mockPokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("Should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("Should have the SimplePokemon signal inputValue", () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it("Should render the pokemon name and image correctly", () => {
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    const img = compiled.querySelector("img");
    const h2 = compiled.querySelector("h2");

    expect(img?.src).toBe(imgUrl);
    expect(img?.alt).toBe(mockPokemon.name);
    expect(h2?.textContent?.trim()).toBe(mockPokemon.name);
  });

  it("Should have the proper ng-reflect-router-link", () => {
    const div = compiled.querySelector("div");
    const routerLink = div?.attributes.getNamedItem("ng-reflect-router-link");
    expect(routerLink?.value).toBe(`/pokemon,${mockPokemon.name}`);
  });
});
