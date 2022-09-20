import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import './Wysiwyg.css';

function Wysiwyg(): JSX.Element {
  const editorRef = useRef<Editor>(null);

  /* this function will used to editor-tools
  const handleExecutor = () => {
    if (editorRef.current) {
      editorRef.current.getInstance().exec('bold');
      editorRef.current.getInstance().exec('strike');
      editorRef.current.getInstance().exec('italic');
      editorRef.current.getInstance().exec('heading', { level: 3 });
    }
  };
  */

  return (
    <div className="container">
      <Editor
        initialValue="내용을 입력해 주세요."
        previewStyle="vertical"
        initialEditType="wysiwyg"
        height="auto"
        useCommandShortcut
        toolbarItems={[]}
        ref={editorRef}
      />
    </div>
  );
}

export default Wysiwyg;
