"use client";

import React, { useEffect, useState } from 'react';
import Card from './Components/Card';

interface Character {
  id: string | number;
  name: string;
  age?: string;
  race?: string;
  img: string;
}

const App = () => {
  const [data, setData] = useState<Character[]>([]);
  const [filtered, setFiltered] = useState<Character[]>([]);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch('/api/characters');
      const something = await res.json();
      setData(something.content);
      setFiltered(something.content);
      localStorage.setItem('characters', JSON.stringify(something.content));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    const lower = query.toLowerCase();
    const results = data.filter((character: Character) =>
      character.name.toLowerCase().includes(lower)
    );
    setFiltered(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Demon Slayer Characters</h1>
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {filtered.length > 0 ? (
          filtered.map((character, idx) => (
            <Card key={idx} character={character} />
          ))
        ) : (
          <h2 className="text-lg text-center">No characters found.</h2>
        )}
      </div>
    </div>
  );
};

export default App;