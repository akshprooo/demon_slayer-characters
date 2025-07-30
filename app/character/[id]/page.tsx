"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Character {
  id: number | string;
  name: string;
  img: string;
  age?: string;
  race?: string;
  gender?: string;
  description?: string;
  quote?: string;
}

const CharacterPage = () => {
  const params = useParams();
  const id = params?.id?.toString() || '';
  const [characterData, setCharacterData] = useState<Character | null>(null);

  useEffect(() => {
    const characters = localStorage.getItem('characters');
    if (characters) {
      const parsed: Character[] = JSON.parse(characters);
      const found = parsed.find((character: Character) => character.id.toString() === id);
      setCharacterData(found || null);
    }
  }, [id]);

  if (!characterData) return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200">
      <p className="text-xl">Loading character details...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden shadow-md">
          <Image
            src={characterData.img}
            alt={characterData.name}
            className="object-contain"
            fill
            priority
          />
        </div>
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{characterData.name}</h1>
          <div className="text-lg text-zinc-700 dark:text-zinc-300">
            <p><span className="font-semibold">Age:</span> {characterData.age || 'Unknown'}</p>
            <p><span className="font-semibold">Race:</span> {characterData.race || 'Unknown'}</p>
            <p><span className="font-semibold">Gender:</span> {characterData.gender || 'Unknown'}</p>
            <p className='text-red-500'>{characterData.description || `"${characterData.quote}"`}</p>
          </div>
          <Link
            href="/"
            className="mt-6 inline-block text-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-all duration-200"
          >
            ← Back to Characters
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;