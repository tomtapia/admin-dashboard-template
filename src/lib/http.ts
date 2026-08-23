const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

let activeTenantId: string | null = null;

export const setActiveTenantId = (id: string | null) => {
  activeTenantId = id;
};

const resolveUrl = (input: RequestInfo | URL): RequestInfo | URL => {
  if (API_BASE_URL && typeof input === "string" && !/^https?:\/\//.test(input)) {
    return `${API_BASE_URL}${input.startsWith("/") ? "" : "/"}${input}`;
  }
  return input;
};

export const http = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (activeTenantId) {
    headers["X-Tenant-Id"] = activeTenantId;
  }

  const response = await fetch(resolveUrl(input), {
    headers: {
      ...headers,
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};
