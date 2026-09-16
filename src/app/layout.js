import "./globals.css";

export const metadata = {
  title: "Tutorial Frontend - Impara React, Redux, Next.js e MUI",
  description: "Tutorial interattivo per imparare il frontend development partendo da zero",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
