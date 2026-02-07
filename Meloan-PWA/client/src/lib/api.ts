// Meloan-PWA/client/src/lib/api.ts

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "https://meloan-api-prod.stgor31.workers.dev";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      "Content-Type": "application/json",
    },
  });

  // если сервер вернул НЕ JSON — покажем текст ошибки
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // не JSON
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || text || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data as T;
}

export const api = {
  health: () => request<{ status: string; ts?: number }>("/api/health"),

  loanCalc: (payload: { amount: number; rate: number; months: number }) =>
    request<any>("/api/loan/calc", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
