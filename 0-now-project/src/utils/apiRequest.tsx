"use client";
/**
 * call API
 * @param url url of api
 * @param method the method of api, only GET, POST, PUT DELETE can be used.
 * @param body optional, the content of api
 * @param timeout the seconds of api if timeout happend (default is 5s)
 * @returns
 */

export const apiRequest = async <T,>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: unknown,
  timeout: number = 5000 // default 5 秒
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      signal: controller.signal,
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || "Unknown error");
    }
    return res.json();
  } catch (error: unknown) {
    if ((error as Error).name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export default apiRequest;
