export function uniqId(length = 12): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));

  return Array.from(bytes).map(el => String.fromCharCode(el + 33)).join('');
}