import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "pokedex",
    loadComponent: () => import("./pages/pokedex-page/pokedex-page.component"),
  },
  {
    path: "pokemon/:id",
    loadComponent: () => import("./pages/pokemon-page/pokemon-page.component"),
  },
  {
    path: "about",
    loadComponent: () => import("./pages/about-page/about-page.component"),
  },
  {
    path: "pricing",
    loadComponent: () => import("./pages/pricing-page/pricing-page.component"),
  },
  {
    path: "contact",
    loadComponent: () => import("./pages/contact-page/contact-page.component"),
  },
  {
    path: "**",
    redirectTo: "about",
  },
];
