type SelectorProps = {
  setBoard: (type:string)=>void
};

export default function BoardSelector({ setBoard }:SelectorProps) {
  return (
    <div>
      <button type="button" onClick={() => setBoard('MYWRITE')}>내가 쓴 글</button>
      <button type="button" onClick={() => setBoard('BOOKMARK')}>북마크</button>
    </div>
  );
}
