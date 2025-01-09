import { categories } from '@/data/categories'
import CategoryLink from './CategoryLink'

export default function Component() {
  return categories.map((category) => (
    <CategoryLink key={category.id} name={category.name} slug={category.slug} />
  ))
}
