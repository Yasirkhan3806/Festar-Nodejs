import React from 'react';
import Picker from '@emoji-mart/react';

export default function Emojis() {
  return (
    <>
       <Picker onEmojiSelect={addEmoji} />
    </>
  )
}
