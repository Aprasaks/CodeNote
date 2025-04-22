// src/app/layout.js
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

export const metadata = {
  title: "CodeNote",
  description: "My awesome blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* inline script를 head 안에 두면, SSR → hydration 전에 실행되어
            초기 <html>에 dark 클래스를 붙여 줍니다. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (
                    theme === 'dark' ||
                    (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
                  ) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) { }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
        <header className="p-4 flex justify-end">
          <ThemeToggle />
        </header>
        {children}
      </body>
    </html>
  );
}
