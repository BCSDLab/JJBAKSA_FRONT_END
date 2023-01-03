import {
  UseFormRegister, UseFormHandleSubmit, UseFormSetError,
} from 'react-hook-form';

export interface FindProp {
  find: string
}

export interface EmailInfo {
  email: string
}

export interface RegisterProp {
  register: UseFormRegister<CodeInfo>,
  handleSubmit: UseFormHandleSubmit<CodeInfo>,
  setError: UseFormSetError<CodeInfo>,
  email: string,
}

export interface InputInfo {
  register: UseFormRegister<CodeInfo>,
  name: 'first' | 'second' | 'third' | 'fourth',
  inputRef: React.MutableRefObject<HTMLInputElement[] | null[]>,
  preventOverLength: (e: React.ChangeEvent<HTMLInputElement>, next: number) => void,
  n: number,
  index: number,
}

export interface CodeInfo {
  first: string,
  second: string,
  third: string,
  fourth: string
}

export interface PasswordInfo {
  password: string,
  passwordCheck: string,
}
