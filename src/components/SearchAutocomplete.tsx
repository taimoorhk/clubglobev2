import { useEffect, useRef, useState } from 'react'
import type { Club } from '@/lib/types'
import type { ClubSearchSuggestion } from '@/lib/filters'

interface SearchAutocompleteProps {
  query: string
  suggestions: ClubSearchSuggestion[]
  onQueryChange: (query: string) => void
  onSelectClub: (club: Club) => void
}

export function SearchAutocomplete({
  query,
  suggestions,
  onQueryChange,
  onSelectClub,
}: SearchAutocompleteProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const closedQueryRef = useRef<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
    if (query === closedQueryRef.current) {
      setIsOpen(false)
      return
    }
    setIsOpen(suggestions.length > 0)
  }, [query, suggestions.length])

  useEffect(() => {
    function onDocumentMouseDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocumentMouseDown)
    return () => document.removeEventListener('mousedown', onDocumentMouseDown)
  }, [])

  function selectSuggestion(suggestion: ClubSearchSuggestion) {
    closedQueryRef.current = suggestion.club.name
    setIsOpen(false)
    onSelectClub(suggestion.club)
  }

  return (
    <div ref={rootRef} className="relative z-[120] min-w-0 flex-1">
      <input
        type="search"
        placeholder="Search clubs, cities, leagues..."
        value={query}
        onChange={(e) => {
          closedQueryRef.current = null
          onQueryChange(e.target.value)
        }}
        onFocus={() => setIsOpen(suggestions.length > 0)}
        onKeyDown={(e) => {
          if (!isOpen || suggestions.length === 0) {
            if (e.key === 'Escape') setIsOpen(false)
            return
          }
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((index) => (index + 1) % suggestions.length)
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex(
              (index) => (index - 1 + suggestions.length) % suggestions.length,
            )
          } else if (e.key === 'Enter') {
            e.preventDefault()
            selectSuggestion(suggestions[activeIndex])
          } else if (e.key === 'Escape') {
            setIsOpen(false)
          }
        }}
        className="h-6 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[11px] placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />

      {isOpen && suggestions.length > 0 ? (
        <div className="absolute left-0 right-0 top-full z-[200] mt-2 max-h-[min(22rem,calc(100vh-5rem))] overflow-y-auto rounded-xl border border-emerald-500/30 bg-slate-950/98 shadow-2xl shadow-black/60 ring-1 ring-emerald-500/20">
          {suggestions.map((suggestion, index) => {
            const club = suggestion.club
            const isActive = index === activeIndex
            return (
              <button
                key={club.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectSuggestion(suggestion)}
                className={`flex w-full items-start gap-2 px-3 py-2 text-left text-sm transition ${
                  isActive
                    ? 'bg-emerald-900/50 text-emerald-50'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                {club.logoUrl ? (
                  <img
                    src={club.logoUrl}
                    alt=""
                    className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-slate-950 object-contain"
                  />
                ) : (
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 text-[10px] font-bold">
                    {club.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{club.name}</span>
                  <span className="block truncate text-xs text-slate-500">
                    {club.city}, {club.country} · T{club.divisionTier} ·{' '}
                    {club.leagueName}
                  </span>
                </span>
                <span className="mt-0.5 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] uppercase text-slate-500">
                  {suggestion.matchField}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
