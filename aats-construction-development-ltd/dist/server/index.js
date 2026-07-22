const htmlRoutes = new Set(["/about", "/services", "/activities", "/faq", "/contact"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    if (pathname === "/" || pathname === "") {
      pathname = "/index.html";
    } else if (htmlRoutes.has(pathname.replace(/\/$/, ""))) {
      pathname = pathname.replace(/\/$/, "") + ".html";
    }

    const assetUrl = new URL(request.url);
    assetUrl.pathname = pathname;

    if (env?.ASSETS?.fetch) {
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }

    return new Response("Asset service unavailable", { status: 503 });
  }
};
