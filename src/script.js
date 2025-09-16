const root = document.documentElement;
const btn  = document.getElementById('themeToggle');

// exact theme colors for exported pages
const COLORS = {
  light: '#d9e0e5',
  dark:  '#13171f'
};
const icons = {
  sun: `<svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0"></path><path fill="currentColor" fill-rule="evenodd" d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75" clip-rule="evenodd"></path><path fill="currentColor" d="M4.398 4.398a.75.75 0 0 1 1.061 0l.393.393a.75.75 0 0 1-1.06 1.06l-.394-.392a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.392.393a.75.75 0 0 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.06 0m-1.453 13.748a.75.75 0 0 1 1.061 0l.393.393a.75.75 0 0 1-1.06 1.06l-.394-.392a.75.75 0 0 1 0-1.06m-12.295 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.06 0" opacity=".5"></path></svg>`,
  moon: `<svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12.97 3a8.02 8.02 0 0 0-4.054 7c0 4.418 3.522 8 7.866 8c1.146 0 2.236-.25 3.218-.698C18.39 19.544 15.787 21 12.849 21C7.962 21 4 16.97 4 12s3.962-9 8.849-9z"></path></svg>`
};

const apply = (theme) => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // swap icon
  btn.innerHTML = theme === 'dark' ? icons.sun : icons.moon;

  // if metas exist (after export), update them
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const msMeta    = document.querySelector('meta[name="msapplication-navbutton-color"]');
  if (themeMeta) themeMeta.content = COLORS[theme];
  if (msMeta)    msMeta.content    = COLORS[theme];
};

// pick saved or system default
const initTheme = localStorage.getItem('theme')
  || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

apply(initTheme);

btn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  apply(next);
});