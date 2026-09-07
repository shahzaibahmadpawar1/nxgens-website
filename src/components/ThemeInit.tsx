import React from 'react';

export const ThemeInit: React.FC = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var t = localStorage.getItem('theme');
              if (t === 'light' || t === 'dark') {
                document.documentElement.setAttribute('toggle-theme', t);
              }
              var l = localStorage.getItem('nx-lang') || localStorage.getItem('lang');
              if (l === 'ar') {
                document.documentElement.setAttribute('lang', 'ar');
                document.documentElement.setAttribute('dir', 'rtl');
                document.documentElement.classList.add('arabic');
              } else {
                document.documentElement.setAttribute('lang', 'en');
                document.documentElement.setAttribute('dir', 'ltr');
                document.documentElement.classList.remove('arabic');
              }
            } catch (e) {}
          })();
        `,
      }}
    />
  );
};
