export async function onRequest(context: any) {
  const url = new URL(context.request.url);

  // Отдаём файлы как есть (assets, картинки и т.п.)
  const res = await context.next();
  if (res.status !== 404) return res;

  // Если 404 — отдаём index.html (SPA fallback)
  return await context.env.ASSETS.fetch(new Request(new URL("/index.html", url)));
}

