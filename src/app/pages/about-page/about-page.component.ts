import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
// import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "page-about",
  imports: [],
  templateUrl: "./about-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit() {
    // Only run in client browser
    // if (isPlatformBrowser(this.platform)) {
    //   document.title = "About Page";
    // }

    this.title.setTitle("About Page");
    this.meta.updateTag({ name: "description", content: "About Page" });
    this.meta.updateTag({ name: "og:title", content: "About Page" });
    this.meta.updateTag({
      name: "keywords",
      content: "Sergio, Orejarena, Angular, SSR, PokemonSSR, About",
    });
  }
}
