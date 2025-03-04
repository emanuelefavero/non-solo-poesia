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

  test('setProgress', () => {
    useEditorStore.getState().setProgress(50)
    expect(useEditorStore.getState().progress).toBe(50)
  })

  test('setLoading', () => {
    useEditorStore.getState().setLoading(true)
    expect(useEditorStore.getState().loading).toBe(true)
  })

  test('setMessage', () => {
    useEditorStore
      .getState()
      .setMessage({ type: 'error', text: 'Error message' })
    expect(useEditorStore.getState().message).toEqual({
      type: 'error',
      text: 'Error message',
    })
  })

  test('setIsFocused', () => {
    useEditorStore.getState().setIsFocused(true)
    expect(useEditorStore.getState().isFocused).toBe(true)
  })

  test('setTitle', () => {
    useEditorStore.getState().setTitle('New title')
    expect(useEditorStore.getState().title).toBe('New title')
  })

  test('setDescription', () => {
    useEditorStore.getState().setDescription('New description')
    expect(useEditorStore.getState().description).toBe('New description')
  })

  test('setAuthor', () => {
    useEditorStore.getState().setAuthor('New author')
    expect(useEditorStore.getState().author).toBe('New author')
  })
})
