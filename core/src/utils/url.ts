export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isSameOrigin(url1: string, url2: string): boolean {
  try {
    const parsed1 = new URL(url1);
    const parsed2 = new URL(url2);

    return (
      parsed1.protocol === parsed2.protocol &&
      parsed1.hostname === parsed2.hostname &&
      parsed1.port === parsed2.port
    );
  } catch {
    return false;
  }
}

export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);

    parsed.hostname = parsed.hostname.toLowerCase();

    if (parsed.pathname !== "/") {
      parsed.pathname = parsed.pathname.replace(/\/+$/, "");
    }

    if (
      (parsed.protocol === "http:" && parsed.port === "80") ||
      (parsed.protocol === "https:" && parsed.port === "443")
    ) {
      parsed.port = "";
    }

    if (parsed.search) {
      const params = new URLSearchParams(parsed.search);
      const sortedParams = new URLSearchParams(
        Array.from(params.entries()).sort(),
      );
      parsed.search = sortedParams.toString();
    }

    parsed.hash = "";

    return parsed.toString();
  } catch {
    return url;
  }
}
