import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import './Wysiwyg.css';
import fontSize from 'tui-editor-plugin-font-size';
import 'tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css';

type WysiwygProps = {
  textToolsValue: {
    Bold: boolean,
    Heading: boolean,
    Paragraph: boolean,
    Through: boolean,
  }
};

function Wysiwyg({ textToolsValue }: WysiwygProps): JSX.Element {
  const editorRef = useRef<Editor>(null);
  /*useEffect(() => {
    if (editorRef.current) {
      const {
        Bold,
        Heading,
        Paragraph,
        Through,
      } = textToolsValue;
      if (Bold) {
        editorRef.current.getInstance().exec('bold');
      } else if (!Bold) {
        editorRef.current.getInstance().exec('bold');
      }
      editorRef.current.getInstance().exec('fontSize', { fontSize: '16px' });
      editorRef.current.getInstance().exec('fontSize', { fontSize: '12px' });
      editorRef.current.getInstance().exec('strike');
    }
  }, [textToolsValue]);*/

  return (
    <div className="container">
      <Editor
        initialValue="내용을 입력해 주세요."
        previewStyle="vertical"
        initialEditType="wysiwyg"
        height="100%"
        useCommandShortcut
        toolbarItems={[]}
        ref={editorRef}
        plugins={[fontSize]}
      />
    </div>
  );
}

export default Wysiwyg;
