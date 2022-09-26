import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WysiwygRef } from 'components/editor/Wysiwyg';

export interface TextEditorProps {
  shop: string | undefined;
}

export default function useEditor({ shop }: TextEditorProps) {
  const [showTextTools, setShowTextTools] = useState(false);
  const [isShopExist, setIsShopExist] = useState(false);
  const [isRate, setIsRate] = useState(false);
  const navigate = useNavigate();
  const wysiwygRef = useRef<WysiwygRef>(null);
  useEffect(() => {
    if (shop === undefined) {
      setIsShopExist(false);
    } else {
      setIsShopExist(true);
    }
  }, [shop]);

  const textToolHandler = () => {
    setShowTextTools(!showTextTools);
  };
  const getShop = () => {
    // 여기서 Shop 정보를 가져온다.
    // Shop 정보가 가져와졌다는 가정하에 true를 전달.
    // 추가적으로 shop이름을 받아오는 로직 작성 필요.
    setIsShopExist(true);
  };
  const rating = () => {
    setIsRate(true);
  };

  return {
    showTextTools,
    isShopExist,
    isRate,
    navigate,
    wysiwygRef,
    textToolHandler,
    getShop,
    rating,
  };
}
