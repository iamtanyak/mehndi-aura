import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const client = join(dist, "client");
const server = join(dist, "server");

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

const staticEntries = [
  "index.html",
  "about.html",
  "services.html",
  "activities.html",
  "faq.html",
  "contact.html",
  "assets",
];

for (const entry of staticEntries) {
  await cp(join(root, entry), join(client, entry), { recursive: true });
}

await mkdir(join(dist, ".openai"), { recursive: true });
await cp(join(root, ".openai", "hosting.json"), join(dist, ".openai", "hosting.json"));

await writeFile(
  join(server, "index.js"),
  `const htmlRoutes = new Set(["/about", "/services", "/activities", "/faq", "/contact"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    if (pathname === "/" || pathname === "") {
      pathname = "/index.html";
    } else if (htmlRoutes.has(pathname.replace(/\\/$/, ""))) {
      pathname = pathname.replace(/\\/$/, "") + ".html";
    }

    const assetUrl = new URL(request.url);
    assetUrl.pathname = pathname;

    if (env?.ASSETS?.fetch) {
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }

    return new Response("Asset service unavailable", { status: 503 });
  }
};
`,
);
