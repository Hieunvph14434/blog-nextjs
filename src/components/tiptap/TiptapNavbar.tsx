import { CodeBlockButton } from '@/components/tiptap-ui/code-block-button';
import { BlockquoteButton } from '@/components/tiptap-ui/blockquote-button';
import { MarkButton } from '@/components/tiptap-ui/mark-button';
import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu';
import { ListDropdownMenu } from '@/components/tiptap-ui/list-dropdown-menu';
import { UndoRedoButton } from '@/components/tiptap-ui/undo-redo-button';
import { ColorHighlightPopover } from '@/components/tiptap-ui/color-highlight-popover';
import { Editor } from '@tiptap/react';
import { LinkPopover } from '@/components/tiptap-ui/link-popover';
import { TextAlignButton } from '@/components/tiptap-ui/text-align-button';
import { ImageUploadButton } from '../tiptap-ui/image-upload-button';
import TextColorPopover from '../tiptap-custom/text-color-popover';
import YoutubePopover from '../tiptap-custom/youtube-popover';

export default function TiptapNavbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className="relative border rounded-md p-1 mb-1 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600 space-x-2">
      <div
        className="tiptap-button-group flex flex-wrap items-center gap-2"
        data-orientation="horizontal"
      >
        <div className="flex border-r border-solid border-slate-200 dark:border-slate-600 ">
          <UndoRedoButton action="undo" />
          <UndoRedoButton action="redo" />
        </div>
        <div className="flex border-r border-solid border-slate-200 dark:border-slate-600 ">
          <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
          <ListDropdownMenu types={['bulletList', 'orderedList', 'taskList']} />
          <BlockquoteButton />
          <CodeBlockButton />
        </div>
        <div className="flex border-r border-solid border-slate-200 dark:border-slate-600 ">
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="code" />
          <MarkButton type="underline" />
          <ColorHighlightPopover />
          <TextColorPopover editor={editor} />
          <LinkPopover />
        </div>
        <div className="flex border-r border-solid border-slate-200 dark:border-slate-600 ">
          <MarkButton type="superscript" />
          <MarkButton type="subscript" />
        </div>
        <div className="flex border-r border-solid border-slate-200 dark:border-slate-600 ">
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
        </div>
        <div className="flex border-r border-solid border-slate-200 dark:border-slate-600 ">
          <ImageUploadButton />
          <YoutubePopover editor={editor} />
        </div>
      </div>
    </div>
  );
}
