// Stored reversed and base64-encoded so the address never appears as plain
// text in the page or the JS bundle, where scraping bots look for it.
const ENCODED = 'bW9jLmxpYW1nQGduaWh0eXJldmUubmFocw=='

export const emailAddress = () => [...atob(ENCODED)].reverse().join('')
