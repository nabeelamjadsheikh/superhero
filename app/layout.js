import '../styles/globals.css';

export const metadata = {
  title: "Humble Superhero API",
  description: "Manage superheroes with humility"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
