export function validateEmail(email: string) {
  if (!email) return { type: 'error', text: "Un email e' richiesta" }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email))
    return { type: 'error', text: 'Email non valida' }

  return { type: 'success', text: '' }
}
