import type { Currency } from "./money";

export interface Person {
  name: string;
  tint: string;
  city?: string;
  currency?: Currency;
}

// Colour on Zend comes from people, not the brand. The cast is spread across the world on
// purpose: Zend has no home country.
export const people = {
  lea: { name: "Léa", tint: "#F4B740", city: "Lisbon", currency: "EUR" },
  jonas: { name: "Jonas", tint: "#8DBDEB", city: "Berlin", currency: "EUR" },
  kenji: { name: "Kenji", tint: "#93CBA0", city: "Tokyo", currency: "JPY" },
  priya: { name: "Priya", tint: "#F2A08B", city: "London", currency: "GBP" },
  asha: { name: "Asha", tint: "#C9AAF0", city: "London", currency: "GBP" },
  mum: { name: "Mum", tint: "#F3D1B0", city: "Mumbai", currency: "INR" },
  rafa: { name: "Rafa", tint: "#9ED9CC", city: "São Paulo", currency: "BRL" },
  minji: { name: "Minji", tint: "#F5C3D2", city: "Seoul", currency: "KRW" },
  ana: { name: "Ana", tint: "#F3D46A", city: "Manila", currency: "PHP" },
  amara: { name: "Amara", tint: "#E8B98A", city: "New York", currency: "USD" },
  wanjiru: { name: "Wanjiru", tint: "#B8DB91", city: "Nairobi", currency: "KES" },
  kwame: { name: "Kwame", tint: "#EBA3A3", city: "Accra", currency: "GHS" },
  kemi: { name: "Kemi", tint: "#A9C4F5", city: "Lagos", currency: "NGN" },
  jide: { name: "Jide", tint: "#F0B58C", city: "London", currency: "GBP" },
  nia: { name: "Nia", tint: "#D7B4F3", city: "Houston", currency: "USD" },
  yuri: { name: "Yuri", tint: "#93D3E8", city: "the Moon", currency: "USD" },
} satisfies Record<string, Person>;
