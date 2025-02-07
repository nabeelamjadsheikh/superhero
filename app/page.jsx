import SuperheroForm from "./components/SuperheroForm";
import { SuperheroList } from "./components/SuperheroList";
import { API_ENDPOINTS } from "./constants/config";
import { ErrorMessage } from "./components/ui/ErrorMessage";

export default async function Home() {
  let superheroes = [];
  let error = null;

  try {
    const res = await fetch(API_ENDPOINTS.SUPERHEROES, { 
      cache: "no-store",
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    superheroes = await res.json();
  } catch (err) {
    console.error("Error fetching superheroes:", err);
    error = "Failed to load superheroes. Please try again later.";
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Humble Superhero API
      </h1>
      <SuperheroForm />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <SuperheroList superheroes={superheroes} />
      )}
    </main>
  );
}
