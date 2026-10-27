const paths = {
  linkedin: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z',
  email: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.3V17h16V7.3l-8 5.2zM5.2 7 12 11.4 18.8 7z',
  resume: 'M6 2h8l6 6v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm7 1.5V9h5.5zM8 13h8v1.5H8zm0 3.5h8V18H8z',
  arrow: 'M5 11h11.2l-4.6-4.6L13 5l7 7-7 7-1.4-1.4 4.6-4.6H5z',
}

// Line icons, drawn with strokes to match the site's line-art symbols.
const strokes = {
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 21a7.5 7.5 0 0 1 15 0',
  route: 'M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6.5 15.5C9 12 8 9 12 9s4 3 7 0',
  chart: 'M4 20h16M7 20v-6M11 20V9M15 20v-4M19 20V5',
  network: 'M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M5 5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M19 5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M5 19m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M19 19m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M6 6l4.5 4.5M18 6l-4.5 4.5M6 18l4.5-4.5M18 18l-4.5-4.5',
  connect: 'M12 12l7-7M12 12l7 7M12 12l-7 7M12 12l-7-7M12 12V3M12 12h9M12 12v9M12 12H3',
  chevrons: 'M4 6l6 6-6 6M12 6l6 6-6 6',
}

export default function Icon({ name, size = 24 }) {
  if (strokes[name]) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={strokes[name]} />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}
