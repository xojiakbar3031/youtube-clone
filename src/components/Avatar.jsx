import { avatarColor, initials } from "../lib/format";

export function Avatar({ name, size = 36 }) {
  return (
    <span
      className="avatar"
      aria-hidden="true"
      style={{ width: size, height: size, background: avatarColor(name), fontSize: size * 0.4 }}
    >
      {initials(name)}
    </span>
  );
}
