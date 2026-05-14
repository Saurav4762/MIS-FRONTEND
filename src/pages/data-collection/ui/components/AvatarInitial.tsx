export default function AvatarInitial({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: '3.6rem',
        width: '3.6rem',
        borderRadius: '50%',
        background: 'var(--mis-color-ink-100)',
        color: 'var(--mis-color-ink-700)',
        fontWeight: 700,
      }}
    >
      {initials}
    </div>
  );
}
