export default function Pagination() {
  const btn = {
    border: '1px solid var(--mis-color-ink-200)',
    borderRadius: '0.4rem',
    padding: '0.4rem 0.6rem',
    background: 'var(--mis-color-white)',
  } as const;

  const active = {
    ...btn,
    border: '1px solid var(--mis-color-pri-500)',
  } as const;

  return (
    <div className="flex items-center gap-2">
      <button style={btn}>&lt;</button>
      <button style={active}>1</button>
      <button style={btn}>2</button>
      <button style={btn}>3</button>
      <button style={btn}>&gt;</button>
    </div>
  );
}
