"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/Card";
import { StarIcon, BoltIcon, HeartIcon } from "@heroicons/react/24/solid";

export function SuperheroList({ superheroes }) {
  if (!superheroes.length) {
    return (
      <Card className="text-center py-12">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-gray-500"
        >
          <div className="flex justify-center mb-4">
            <HeartIcon className="w-16 h-16 text-gray-300" />
          </div>
          <p className="text-lg">No superheroes found.</p>
          <p className="text-sm text-gray-400 mt-2">Add your first superhero above!</p>
        </motion.div>
      </Card>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center">
        <StarIcon className="w-6 h-6 text-yellow-500 mr-2" />
        Superhero List
      </h2>
      <AnimatePresence>
        <motion.div 
          className="grid gap-6 md:grid-cols-2"
          layout
        >
          {superheroes.map((hero, index) => (
            <motion.div
              key={hero.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-2 border-gray-100 hover:border-blue-500 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-xl text-gray-800">{hero.name}</h3>
                  <span 
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    Score: {hero.humilityScore}
                  </span>
                </div>
                <div className="mt-4 text-gray-600">
                  <div className="flex items-center gap-2 text-lg">
                    <BoltIcon className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">Superpower:</span> 
                    <span className="text-gray-700">{hero.superpower}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
} 