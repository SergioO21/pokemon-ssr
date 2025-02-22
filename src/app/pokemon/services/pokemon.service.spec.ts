import { TestBed } from "@angular/core/testing";
import { PokemonService } from "./pokemon.service";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { Pokemon, PokemonPagination, SimplePokemon } from "../interfaces";
import { catchError } from "rxjs";

const mockPokeAPIResponse: PokemonPagination = {
  count: 1304,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  {
    id: "1",
    name: "bulbasaur",
  },
  {
    id: "2",
    name: "ivysaur",
  },
];

const mockPokemon: any = {
  id: 1,
  name: "cubone",
};

describe("PokemonService", () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("Should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Should load a page of SimplePokemons", () => {
    service.loadPage(1).subscribe((pokemon) => {
      expect(pokemon).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );

    expect(req.request.method).toBe("GET");

    req.flush(mockPokeAPIResponse);
  });

  it("Should load a Pokemon by ID", () => {
    const pokemonId = "104";

    service.loadPokemon(pokemonId).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    expect(req.request.method).toBe("GET");

    req.flush(mockPokemon);
  });

  it("Should load a Pokemon by Name", () => {
    const pokemonName = "cubone";

    service.loadPokemon(pokemonName).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe("GET");

    req.flush(mockPokemon);
  });

  it("Should catch error if Pokemon not found", () => {
    const pokemonName = "Sergio";

    service
      .loadPokemon(pokemonName)
      .pipe(
        catchError((error) => {
          expect(error.message).toContain("Pokemon not found");
          return [];
        })
      )
      .subscribe();

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe("GET");

    req.flush("Pokemon not found", {
      status: 404,
      statusText: "Not Found",
    });
  });
});
