import { atom, useAtom } from 'jotai';
import makeToast from 'utils/ts/makeToast';

export const shopSearchFormAtom = atom({
  text: '',
  isEnter: false,
  submittedText: '',
});

export const postSearchFormAtom = atom({
  text: '',
  isEnter: false,
  submittedText: '',
});

const useSearchForm = (pathname: string) => {
  const searchFormAtom = pathname === '/shop' ? shopSearchFormAtom : postSearchFormAtom;
  const [searchForm, setSearchForm] = useAtom(searchFormAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm((prevSearchForm) => ({
      ...prevSearchForm,
      text: e.target.value,
    }));
  };

  const resetText = () => {
    setSearchForm({
      text: '',
      submittedText: '',
      isEnter: false,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchForm.text.trim().length === 0) {
      makeToast('warning', '검색어를 입력해주세요.');
      return;
    }

    if (searchForm.text) {
      setSearchForm((prevSearchForm) => ({
        ...prevSearchForm,
        submittedText: searchForm.text,
        isEnter: true,
      }));
    }
  };

  return {
    text: searchForm.text,
    handleChange,
    handleSubmit,
    submittedText: searchForm.submittedText,
    isEnter: searchForm.isEnter,
    resetText,
  };
};

export default useSearchForm;
