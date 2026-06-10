export function formatPrice(n: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("tr-TR").format(new Date(dateStr));
}
