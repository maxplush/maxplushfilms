// Light/dark toggle. Follows the device setting until the visitor picks one;
// the inline snippet in each page's <head> applies a saved choice before paint.
(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  if (!button) return;

  const isDark = () =>
    root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;

  const label = () => {
    button.textContent = isDark() ? 'Light' : 'Dark';
  };

  button.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    label();
  });

  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', label);
  label();
})();
