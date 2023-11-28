import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import makeToast from 'utils/ts/makeToast';

export const searchFormAtom = atom({
  text: '',
  isEnter: false,
  submittedText: '',
});

const useSearchForm = () => {
  const [searchForm, setSearchForm] = useAtom(searchFormAtom);
  const [submittedText, setSubmittedText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm((prevSearchForm) => ({
      ...prevSearchForm,
      text: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchForm.text.trim().length === 0) {
      makeToast('warning', '검색어를 입력해주세요.');
      return;
    }

    if (searchForm.text) {
      setSubmittedText(searchForm.text);
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
    sumbmittedText: submittedText,

  };
};

export default useSearchForm;
