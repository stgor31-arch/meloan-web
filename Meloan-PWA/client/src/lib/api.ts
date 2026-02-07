export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL?.toString().replace(/\/$/, "") ||
  "https://meloan-api-prod.stgor31.workers.dev";

export async function apiFetch(path: string, init: RequestInit = {}) {
  const url = ${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path};

  const headers = new Headers(init.headers || {});
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    ...init,
    headers,
  });

  // если не JSON — вернем текст для отладки
  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");

  const data = isJson ? await res.json().catch(() => null) : await res.text();

  if (!res.ok) {
    throw new Error(
      typeof data === "string"
        ? data
        : JSON.stringify(data ?? { error: "Request failed" })
    );
  }

  return data;
}
