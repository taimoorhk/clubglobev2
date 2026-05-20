import type { Club } from '@/lib/types'
import { getInitials, initialsColor } from '@/lib/initialsAvatar'

function createFallback(club: Club): HTMLSpanElement {
  const span = document.createElement('span')
  span.className =
    'flex h-full w-full items-center justify-center text-[10px] font-bold text-white'
  span.style.backgroundColor = initialsColor(club.name)
  span.textContent = getInitials(club.name)
  return span
}

export function buildClubPinElement(
  club: Club,
  options: { selected?: boolean; onClick?: (club: Club) => void },
): HTMLDivElement {
  const el = document.createElement('div')
  el.className = `club-pin group ${options.selected ? 'selected' : ''}`
  el.title = `${club.name} — Tier ${club.divisionTier}`

  const wrapper = document.createElement('div')
  wrapper.className =
    'relative flex flex-col items-center gap-0.5 pointer-events-auto'

  const badge = document.createElement('div')
  badge.className = `flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 shadow-lg ${
    options.selected
      ? 'border-emerald-400 ring-2 ring-emerald-400/50'
      : 'border-white/80'
  } bg-slate-900`

  if (club.logoUrl) {
    const img = document.createElement('img')
    img.src = club.logoUrl
    img.alt = club.name
    img.className = 'h-full w-full object-contain p-0.5'
    img.loading = 'lazy'
    img.onerror = () => {
      img.remove()
      badge.appendChild(createFallback(club))
    }
    badge.appendChild(img)
  } else {
    badge.appendChild(createFallback(club))
  }

  const tier = document.createElement('span')
  tier.className =
    'rounded bg-slate-900/90 px-1 text-[9px] font-bold text-emerald-400 border border-emerald-500/30'
  tier.textContent = `T${club.divisionTier}`

  const tooltip = document.createElement('div')
  tooltip.className =
    'absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900/95 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none border border-slate-700'
  tooltip.textContent = club.name

  wrapper.appendChild(tooltip)
  wrapper.appendChild(badge)
  wrapper.appendChild(tier)
  el.appendChild(wrapper)

  el.addEventListener('click', (e) => {
    e.stopPropagation()
    options.onClick?.(club)
  })

  return el
}
