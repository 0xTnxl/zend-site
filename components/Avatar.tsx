import type { Person } from "@/lib/people";

export function Avatar({ person, size = 40, ring = false }: { person: Person; size?: number; ring?: boolean }) {
  return (
    <span
      className={ring ? "avatar avatar-ring" : "avatar"}
      style={{ width: size, height: size, background: person.tint, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {person.name.charAt(0)}
    </span>
  );
}
