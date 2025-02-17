import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { routes } from "./app.routes";
import { Location } from "@angular/common";

describe("App Routes", () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it("Should navigate to 'about' redirects to '/about'", async () => {
    await router.navigate(["about"]);
    expect(location.path()).toBe("/about");
  });

  it("Should navigate to 'pricing' redirects to '/pricing'", async () => {
    await router.navigate(["pricing"]);
    expect(location.path()).toBe("/pricing");
  });

  it("Should navigate to 'contact' redirects to '/contact'", async () => {
    await router.navigate(["contact"]);
    expect(location.path()).toBe("/contact");
  });

  it("Should navigate to '**' redirects to '/pokedex/page/1'", async () => {
    await router.navigate(["random-path"]);
    expect(location.path()).toBe("/pokedex/page/1");
  });

  it("Should navigate to 'pokedex/page/2' redirects to '/pokedex/page/2'", async () => {
    await router.navigate(["pokedex/page/2"]);
    expect(location.path()).toBe("/pokedex/page/2");
  });

  it("Should navigate to 'pokemon/21' redirects to '/pokemon/21'", async () => {
    await router.navigate(["pokemon/21"]);
    expect(location.path()).toBe("/pokemon/21");
  });

  it("Should load the proper component", async () => {
    // ABOUT
    const aboutRoute = routes.find((route) => route.path === "about")!;
    const aboutComponent = (await aboutRoute.loadComponent!()) as any;
    expect(aboutRoute).toBeDefined();
    expect(aboutComponent.default.name).toBe("AboutPageComponent");

    // PRICING
    const pricingRoute = routes.find((route) => route.path === "pricing")!;
    const pricingComponent = (await pricingRoute.loadComponent!()) as any;
    expect(pricingRoute).toBeDefined();
    expect(pricingComponent.default.name).toBe("PricingPageComponent");

    //CONTACT
    const contactRoute = routes.find((route) => route.path === "contact")!;
    const contactComponent = (await contactRoute.loadComponent!()) as any;
    expect(contactRoute).toBeDefined();
    expect(contactComponent.default.name).toBe("ContactPageComponent");

    // POKEDEX
    const pokedexRoute = routes.find(
      (route) => route.path === "pokedex/page/:page"
    )!;
    const pokedexComponent = (await pokedexRoute.loadComponent!()) as any;
    expect(pokedexRoute).toBeDefined();
    expect(pokedexComponent.default.name).toBe("PokedexPageComponent");

    // POKEMON
    const pokemonRoute = routes.find((route) => route.path === "pokemon/:id")!;
    const pokemonComponent = (await pokemonRoute.loadComponent!()) as any;
    expect(pokemonRoute).toBeDefined();
    expect(pokemonComponent.default.name).toBe("PokemonPageComponent");
  });
});
