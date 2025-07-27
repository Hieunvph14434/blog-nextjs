import { Baseline } from 'lucide-react';
import { useState } from 'react';
import { ColorResult, CompactPicker } from 'react-color';
import { Editor } from '@tiptap/react';
import { Button } from '../tiptap-ui-primitive/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../tiptap-ui-primitive/popover';

export default function TextColorPopover({
  editor,
}: {
  editor: Editor | null;
}) {
  const [color, setColor] = useState<string>('#000000');

  if (!editor) return null;

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);

    editor.chain().focus().setColor(color.hex).run();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" data-style="ghost" role="button" tabIndex={-1}>
          <Baseline size={20} opacity={0.7} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <CompactPicker
          color={color}
          onChangeComplete={handleColorChange}
          data-testid="setColor"
        />
      </PopoverContent>
    </Popover>
  );
}
