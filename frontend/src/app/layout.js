export const metadata = {
  title: 'Book Tracker',
  description: 'Manage your reading logs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0f172a' }}>
        {children}
      </body>
    </html>
  );
}