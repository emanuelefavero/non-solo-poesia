'use client'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'

export default function TipTap() {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: '<p>Edit me!</p>',
    immediatelyRender: false,
    // autofocus: true,
    // injectCSS: false,
    // editorProps: {
    //   attributes: {
    //     class: 'bg-red-500',
    //   },
    // },
  })

  return <EditorContent editor={editor} />
}
