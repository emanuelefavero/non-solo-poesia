import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import { useEditorStore } from './editorStore'

describe('editorStore', () => {
  afterEach(() => {
    useEditorStore.getState().clearPost() // reset state after each test
  })

  test('initial state is correct', () => {
    const state = useEditorStore.getState()

    expect(state.progress).toBe(0)
    expect(state.loading).toBe(false)
    expect(state.message).toEqual({ type: 'success', text: '' })
    expect(state.isFocused).toBe(false)
    expect(state.title).toBe('')
    expect(state.description).toBe('')
    expect(state.author).toBe(authors[0].name)
    expect(state.category).toBe(categories[0].name)
    expect(state.coverImage).toBe('')
    expect(state.coverImageType).toBe('url')
    expect(state.coverImageCloudinaryPreview).toBeNull()
    expect(state.coverImageCloudinary).toBe('')
    expect(state.prevCloudinaryPublicId).toBe('')
  })
})
