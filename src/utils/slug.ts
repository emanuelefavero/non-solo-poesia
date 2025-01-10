export function convertNameToSlug(name: string) {
  return name.toLowerCase().replace(/\s/g, '-') // Ab Dc -> ab-dc
}

export function convertSlugToName(slug: string) {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') // ab-dc -> Ab Dc
}
