import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import './Wysiwyg.scss';
import fontSize from 'tui-editor-plugin-font-size';
import 'tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css';

export interface WysiwygRef {
  addImg: () => void,
  bold: () => void,
  heading: () => void,
  paragraph: () => void,
  through: () => void,
}

const Wysiwyg = forwardRef((_props, ref) => {
  const editorRef = useRef<Editor>(null);
  useImperativeHandle(ref, () => ({
    addImg() {
      if (editorRef.current) {
        editorRef.current.getInstance().exec('addImage', { imageUrl: 'https://picsum.photos/200/300' });
      }
    },
    bold() {
      if (editorRef.current) {
        editorRef.current.getInstance().exec('bold');
      }
    },
    heading() {
      if (editorRef.current) {
        editorRef.current.getInstance().exec('fontSize', { fontSize: '16px' });
      }
    },
    paragraph() {
      if (editorRef.current) {
        editorRef.current.getInstance().exec('fontSize', { fontSize: '12px' });
      }
    },
    through() {
      if (editorRef.current) {
        editorRef.current.getInstance().exec('strike');
      }
    },
  }));

  return (
    <div className="container">
      <Editor
        initialValue=" "
        placeholder="내용을 입력해 주세요."
        initialEditType="wysiwyg"
        height="100%"
        useCommandShortcut
        toolbarItems={[]}
        ref={editorRef}
        plugins={[fontSize]}
      />
    </div>
  );
});

export default Wysiwyg;
