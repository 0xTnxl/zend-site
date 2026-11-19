// Every one of these is a currency Zend can show amounts in (see src/fx_rates.rs).
// Picked to have a symbol nobody confuses with another, so "$" always means US dollars here.
export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "INR" | "BRL" | "KRW" | "PHP" | "KES" | "GHS" | "NGN";

// Example rates (units per US dollar) for the page's illustrations only. The app uses live rates.
const PER_USD: Record<Currency, number> = {
  USD: 1,
  EUR: 0.87,
  GBP: 0.76,
  JPY: 150,
  INR: 85,
  BRL: 5.5,
  KRW: 1400,
  PHP: 57,
  KES: 129,
  GHS: 12,
  NGN: 1500,
};

const formatters = new Map<Currency, Intl.NumberFormat>();

/** Symbols always come from Intl, never typed by hand. */
export function formatMoney(amount: number, currency: Currency): string {
  let f = formatters.get(currency);
  if (!f) {
    f = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 0,
    });
    formatters.set(currency, f);
  }
  return f.format(Math.round(amount));
}

export function convert(amount: number, from: Currency, to: Currency): number {
  return (amount / PER_USD[from]) * PER_USD[to];
}
