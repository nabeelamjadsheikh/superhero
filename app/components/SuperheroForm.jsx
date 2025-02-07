"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ErrorMessage } from "./ui/ErrorMessage";
import { API_ENDPOINTS, FORM_VALIDATION } from "../constants/config";
import { PlusIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Card } from "./ui/Card";

const INITIAL_FORM_STATE = {
  name: "",
  superpower: "",
  humilityScore: "",
};

const VALIDATION_MESSAGES = {
  REQUIRED: "All fields are required.",
  HUMILITY_SCORE: {
    RANGE: (min, max) => `Humility score must be a number between ${min} and ${max}.`,
    FORMAT: "Humility score must be a valid number."
  },
  NAME_LENGTH: "Superhero name must be between 2 and 50 characters.",
  SUPERPOWER_LENGTH: "Superpower must be between 2 and 100 characters."
};

export default function SuperheroForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, superpower, humilityScore } = formData;
    
    // Check required fields
    if (!name?.trim() || !superpower?.trim() || !humilityScore) {
      throw new Error(VALIDATION_MESSAGES.REQUIRED);
    }

    // Validate name length
    if (name.trim().length < 2 || name.trim().length > 50) {
      throw new Error(VALIDATION_MESSAGES.NAME_LENGTH);
    }

    // Validate superpower length
    if (superpower.trim().length < 2 || superpower.trim().length > 100) {
      throw new Error(VALIDATION_MESSAGES.SUPERPOWER_LENGTH);
    }

    // Validate humility score
    const score = parseInt(humilityScore, 10);
    if (isNaN(score)) {
      throw new Error(VALIDATION_MESSAGES.HUMILITY_SCORE.FORMAT);
    }
    
    if (
      score < FORM_VALIDATION.HUMILITY_SCORE.MIN || 
      score > FORM_VALIDATION.HUMILITY_SCORE.MAX
    ) {
      throw new Error(
        VALIDATION_MESSAGES.HUMILITY_SCORE.RANGE(
          FORM_VALIDATION.HUMILITY_SCORE.MIN,
          FORM_VALIDATION.HUMILITY_SCORE.MAX
        )
      );
    }

    return score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const validatedScore = validateForm();

      const res = await fetch(API_ENDPOINTS.SUPERHEROES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          ...formData, 
          humilityScore: validatedScore 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add superhero");
      }

      setFormData(INITIAL_FORM_STATE);
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to add superhero.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8">
      {!isExpanded ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center"
        >
          <Button
            onClick={() => setIsExpanded(true)}
            className="group inline-flex px-6 bg-white hover:bg-blue-50 text-blue-600 max-w-fit"
          >
            <span className="flex items-center justify-center gap-2">
              <span>Add New Superhero</span>
              <SparklesIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </Button>
        </motion.div>
      ) : (
        <Card>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Superhero</h2>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close form</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter superhero name"
                icon={<span className="text-xl">🦸‍♂️</span>}
              />
              
              <Input
                label="Superpower"
                name="superpower"
                value={formData.superpower}
                onChange={handleChange}
                placeholder="Enter superhero superpower"
                icon={<span className="text-xl">⚡</span>}
              />
              
              <Input
                label="Humility Score"
                name="humilityScore"
                type="range"
                value={formData.humilityScore}
                onChange={handleChange}
                min={FORM_VALIDATION.HUMILITY_SCORE.MIN}
                max={FORM_VALIDATION.HUMILITY_SCORE.MAX}
                className="range-input"
                showValue
                icon={<span className="text-xl">🎯</span>}
              />
            </motion.div>

            <AnimatePresence>
              {error && <ErrorMessage message={error} />}
            </AnimatePresence>

            <motion.div
              className="mt-6 grid grid-cols-2 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? 'Adding Superhero...' : 'Add Superhero'}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setFormData(INITIAL_FORM_STATE);
                  setError("");
                }}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={isSubmitting}
              >
                Reset
              </Button>
            </motion.div>
          </form>
        </Card>
      )}
    </div>
  );
}
