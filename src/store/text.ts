import { atom, useAtom } from 'jotai';

export const searchFormAtom = atom({
  text: '',
  isEnter: false,
  submittedText: '',
});

const useSearchForm = () => {
  const [searchForm, setSearchForm] = useAtom(searchFormAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm((prevSearchForm) => ({
      ...prevSearchForm,
      text: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };
};

export default useSearchForm;
