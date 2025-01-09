export function convertNameToSlug(name: string) {
  return name.toLowerCase().replace(/\s/g, '-')
}
