import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WysiwygRef } from 'components/editor/Wysiwyg';

export default function useEditor() {
  const [showTextTools, setShowTextTools] = useState(false);
  const [isRate, setIsRate] = useState(false);
  const navigate = useNavigate();
  const wysiwygRef = useRef<WysiwygRef>(null);

  const textToolHandler = () => {
    setShowTextTools(!showTextTools);
  };
  const rating = () => {
    setIsRate(true);
  };

  return {
    showTextTools,
    isRate,
    navigate,
    wysiwygRef,
    textToolHandler,
    rating,
  };
}
