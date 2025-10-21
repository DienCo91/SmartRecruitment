import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from '../ui/emoji-picker';
import { Button } from '../ui/button';

interface Props {
  iconButton?: React.ReactNode;
  onEmojiSelect: (value: string) => void;
}

const EmojiCustom: React.FC<Props> = ({ iconButton, onEmojiSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>{iconButton ?? <Button>Open emoji picker</Button>}</PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <EmojiPicker
          className="h-[342px]"
          onEmojiSelect={({ emoji }) => {
            onEmojiSelect(emoji);
          }}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent />
          <EmojiPickerFooter />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiCustom;
