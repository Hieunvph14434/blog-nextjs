import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Input } from '@/components/ui/input';
import { Film, Youtube } from 'lucide-react';
import { Button } from '../ui/button';
import { Button as BTN } from '../tiptap-ui-primitive/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../tiptap-ui-primitive/popover';

interface YoutubePopoverProps {
  editor: Editor | null;
}

export default function YoutubePopover({ editor }: YoutubePopoverProps) {
  const [isOpen, setIsOpen] = useState(false); // State to control Popover visibility
  const [url, setUrl] = useState(''); // State to store the URL entered by the user

  if (!editor) {
    return null;
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleCancel = () => {
    setUrl(''); // Reset the URL state
    setIsOpen(false); // Close the popover
  };

  const handleOk = () => {
    // Handle the URL submission (e.g., add the video)
    console.log('Video URL:', url);
    editor.commands.setYoutubeVideo({
      src: url,
    });
    setIsOpen(false); // Close the popover
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <BTN type="button" data-style="ghost" role="button" tabIndex={-1}>
          <Youtube size={20} opacity={0.8} />
        </BTN>
      </PopoverTrigger>
      <PopoverContent className="w-100">
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input
            type="text"
            placeholder="Enter YouTube URL"
            size={18}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            type="submit"
            variant="secondary"
            size={'sm'}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            size={'sm'}
            onClick={handleOk}
          >
            Ok
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
