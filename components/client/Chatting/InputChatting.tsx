'use client';
import EmojiCustom from '@/components/Emoji/EmojiCustom';
import { CustomInput } from '@/components/Inputs/CustomInput';
import { Button } from '@/components/ui/button';
import { sendChatMessage } from '@/lib/stompClient';
import { Send, Smile } from 'lucide-react';
import React, { useRef } from 'react';

interface IInputChatting {
  recipientId: number;
}

const InputChatting: React.FC<IInputChatting> = ({ recipientId }) => {
  const [txt, setTxt] = React.useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onEmojiSelect = (emoji: string) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;

    const newText = txt.slice(0, start) + emoji + txt.slice(end);
    setTxt(newText);

    requestAnimationFrame(() => {
      const newPos = start + emoji.length;
      input.setSelectionRange(newPos, newPos);
    });
  };

  const onSubmit = () => {
    console.log('first', {
      content: txt,
      recipientId: recipientId + '',
    });

    sendChatMessage({
      content: txt,
      recipientId: recipientId,
    });
    setTxt('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex mt-[4px] items-center">
      <CustomInput
        ref={inputRef}
        value={txt}
        onChange={e => setTxt(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Aa"
        className="mr-[10px] rounded-2xl"
        endIcon={
          <EmojiCustom
            iconButton={<Smile className="text-white" />}
            onEmojiSelect={onEmojiSelect}
          />
        }
      />
      <Button size={'lg'} className="rounded-full cursor-pointer " onClick={onSubmit}>
        <Send />
      </Button>
    </div>
  );
};

export default InputChatting;
