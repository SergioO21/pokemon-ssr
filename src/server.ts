// https://developers.netlify.com/guides/whats-new-with-angular-19-on-netlify/

import { CommonEngine } from "@angular/ssr/node";
import { render } from "@netlify/angular-runtime/common-engine";

const commonEngine = new CommonEngine();

export async function netlifyCommonEngineHandler(
  request: Request,
  context: any
): Promise<Response> {
  return await render(commonEngine);
}
