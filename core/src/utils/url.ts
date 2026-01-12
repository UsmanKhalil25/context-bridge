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
