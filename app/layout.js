

import './globals.css'
export const metadata = {
  title: 'Simple Blog',
  description: 'A basic blog built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
