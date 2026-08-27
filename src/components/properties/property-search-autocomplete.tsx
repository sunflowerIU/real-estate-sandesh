"use client";

import { memo, useId, useMemo, useState, type KeyboardEvent } from "react";
import { Home, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface PropertySearchSuggestion {
  value: string;
  label: string;
  description: string;
  kind: "location" | "property";
}

interface PropertySearchAutocompleteProps {
  value: string;
  suggestions: PropertySearchSuggestion[];
  onValueChange: (value: string) => void;
  copy: {
    label: string;
    placeholder: string;
    suggestionsLabel: string;
    suggestionsHeading: string;
  };
}

function PropertySearchAutocompleteComponent({
  value,
  suggestions,
  onValueChange,
  copy,
}: PropertySearchAutocompleteProps) {
  const inputId = useId();
  const listboxId = `${inputId}-suggestions`;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const matches = useMemo(() => {
    const term = value.trim().toLocaleLowerCase();
    const matchingSuggestions = term
      ? suggestions.filter((suggestion) =>
          `${suggestion.label} ${suggestion.value} ${suggestion.description}`
            .toLocaleLowerCase()
            .includes(term),
        )
      : suggestions.filter((suggestion) => suggestion.kind === "location");

    return matchingSuggestions.slice(0, 6);
  }, [suggestions, value]);

  const chooseSuggestion = (suggestion: PropertySearchSuggestion) => {
    onValueChange(suggestion.value);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.min(index + 1, matches.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      chooseSuggestion(matches[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const showSuggestions = open && matches.length > 0;

  return (
    <div
      className="search-field"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
          setActiveIndex(-1);
        }
      }}
    >
      <label className="sr-only" htmlFor={inputId}>
        {copy.label}
      </label>
      <Search aria-hidden="true" />
      <Input
        id={inputId}
        role="combobox"
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={showSuggestions}
        aria-activedescendant={
          activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined
        }
        autoComplete="off"
        value={value}
        onChange={(event) => {
          onValueChange(event.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={copy.placeholder}
      />
      {showSuggestions && (
        <div
          className="search-suggestions"
          id={listboxId}
          role="listbox"
          aria-label={copy.suggestionsLabel}
        >
          <span className="search-suggestions-label">{copy.suggestionsHeading}</span>
          {matches.map((suggestion, index) => (
            <button
              className={`search-suggestion${activeIndex === index ? " active" : ""}`}
              id={`${listboxId}-${index}`}
              key={`${suggestion.kind}-${suggestion.value}`}
              type="button"
              role="option"
              aria-selected={activeIndex === index}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => chooseSuggestion(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="search-suggestion-icon">
                {suggestion.kind === "location" ? (
                  <MapPin aria-hidden="true" />
                ) : (
                  <Home aria-hidden="true" />
                )}
              </span>
              <span>
                <strong>{suggestion.label}</strong>
                <small>{suggestion.description}</small>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const PropertySearchAutocomplete = memo(
  PropertySearchAutocompleteComponent,
);
