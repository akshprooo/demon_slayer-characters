// Card.tsx
"use client"

import React from 'react'
import Image from 'next/image'

// Define type for the character prop
interface Character {
  id: string | number;
  name: string;
  age?: string;
  race?: string;
  img: string;
}

const Card = ({ character }: { character: Character }) => {
  return (
    <div className="w-64 sm:w-56 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-md flex flex-col items-center gap-3 transition-transform duration-200 hover:scale-105">
      <div className="relative w-40 h-56">
        <Image src={character.img} alt={character.name} fill className="object-cover rounded-md" />
      </div>
      <h2 className="text-xl font-semibold text-center text-zinc-800 dark:text-zinc-100">{character.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">Age: {character.age || 'Unknown'}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">Race: {character.race || 'Unknown'}</p>
      <a href={`character/${character.id}`} className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md">
        View More
      </a>
    </div>
  )
}

export default Card
