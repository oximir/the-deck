const root  = document.documentElement;
const btn   = document.getElementById('themeToggle');
const share = document.getElementById('share');
const modal = document.getElementById('modal');

// exact theme colors for exported pages
const COLORS = {
  light: '#d9e0e5',
  dark:  '#13171f'
};
const icons = {
  sun: `<svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0"></path><path fill="currentColor" fill-rule="evenodd" d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75" clip-rule="evenodd"></path><path fill="currentColor" d="M4.398 4.398a.75.75 0 0 1 1.061 0l.393.393a.75.75 0 0 1-1.06 1.06l-.394-.392a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.392.393a.75.75 0 0 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.06 0m-1.453 13.748a.75.75 0 0 1 1.061 0l.393.393a.75.75 0 0 1-1.06 1.06l-.394-.392a.75.75 0 0 1 0-1.06m-12.295 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.06 0" opacity=".5"></path></svg>`,
  moon: `<svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12.97 3a8.02 8.02 0 0 0-4.054 7c0 4.418 3.522 8 7.866 8c1.146 0 2.236-.25 3.218-.698C18.39 19.544 15.787 21 12.849 21C7.962 21 4 16.97 4 12s3.962-9 8.849-9z"></path></svg>`,
  shareFill: `<svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 22q-1.25 0-2.125-.875T14 19q0-.15.075-.7L7.05 14.2q-.4.375-.925.588T5 15q-1.25 0-2.125-.875T2 12t.875-2.125T5 9q.6 0 1.125.213t.925.587l7.025-4.1q-.05-.175-.062-.337T14 5q0-1.25.875-2.125T17 2t2.125.875T20 5t-.875 2.125T17 8q-.6 0-1.125-.213T14.95 7.2l-7.025 4.1q.05.175.063.338T8 12t-.012.363t-.063.337l7.025 4.1q.4-.375.925-.587T17 16q1.25 0 2.125.875T20 19t-.875 2.125T17 22"/></svg>`,
  shareStroke: `<svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 22q-1.25 0-2.125-.875T14 19q0-.15.075-.7L7.05 14.2q-.4.375-.925.588T5 15q-1.25 0-2.125-.875T2 12t.875-2.125T5 9q.6 0 1.125.213t.925.587l7.025-4.1q-.05-.175-.062-.337T14 5q0-1.25.875-2.125T17 2t2.125.875T20 5t-.875 2.125T17 8q-.6 0-1.125-.213T14.95 7.2l-7.025 4.1q.05.175.063.338T8 12t-.012.363t-.063.337l7.025 4.1q.4-.375.925-.587T17 16q1.25 0 2.125.875T20 19t-.875 2.125T17 22m0-2q.425 0 .713-.287T18 19t-.288-.712T17 18t-.712.288T16 19t.288.713T17 20M5 13q.425 0 .713-.288T6 12t-.288-.712T5 11t-.712.288T4 12t.288.713T5 13m12-7q.425 0 .713-.288T18 5t-.288-.712T17 4t-.712.288T16 5t.288.713T17 6m0-1"/></svg>`,
};

const apply = theme => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // swap icon
  btn.innerHTML   = theme === 'dark' ? icons.sun : icons.moon;
  share.innerHTML = theme === 'dark' ? icons.shareStroke : icons.shareFill;

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

// toggle the theme
btn.onclick = () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  apply(next);
};

// toggle modal
share.addEventListener('click', () => modal.setAttribute('open',''));
modal.addEventListener('click', () => modal.removeAttribute('open',''));