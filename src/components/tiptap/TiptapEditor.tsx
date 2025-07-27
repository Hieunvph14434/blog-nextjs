import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import TiptapNavbar from './TiptapNavbar';
import StarterKit from '@tiptap/starter-kit';
import Youtube from '@tiptap/extension-youtube';
import { Underline } from '@tiptap/extension-underline';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import '@/components/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/components/tiptap-node/code-block-node/code-block-node.scss';
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss';
import '@/components/tiptap-node/list-node/list-node.scss';
// import '@/components/tiptap-node/image-node/image-node.scss';
import '@/components/tiptap-node/heading-node/heading-node.scss';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { TextStyle, Color } from '@tiptap/extension-text-style';
import { ImageUploadNode } from '../tiptap-node/image-upload-node';
import { handleImageUpload, MAX_FILE_SIZE } from '@/lib/tiptap-utils';

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  maxHeight?: string;
  editable?: boolean;
}

export default function TiptapEditor({
  value,
  onChange,
  maxHeight,
  editable = true,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Underline,
      Superscript,
      Subscript,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error('Upload failed:', error),
      }),
      TextStyle,
      Color,
      Youtube.configure({
        controls: false,
        nocookie: true,
        inline: false,
        allowFullscreen: true,
        HTMLAttributes: {
          class: 'w-full aspect-video',
        },
      }),
    ],
    immediatelyRender: false,
    // content: '<p>Write your content here...</p>',
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // onChange(html);
      requestAnimationFrame(() => {
        onChange(html);
      });
    },
    editorProps: {
      attributes: {
        class: 'min-h-[200px] border rounded-md bg-transparent py-2 px-3',
      },
    },
  });

  if (editor) editor.setEditable(editable);

  return (
    <div className="tiptap-editor">
      <EditorContext.Provider value={{ editor }}>
        {editable && <TiptapNavbar editor={editor} />}
        {/* Add your Tiptap editor component here */}
        <div
          className={`${
            maxHeight || 'max-h-[200px]'
          } overflow-y-auto bg-white dark:bg-gray-800`}
        >
          <EditorContent editor={editor} />
        </div>
      </EditorContext.Provider>
    </div>
  );
}
