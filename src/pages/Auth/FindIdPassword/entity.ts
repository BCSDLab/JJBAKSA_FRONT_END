import {
  UseFormRegister, UseFormHandleSubmit, UseFormSetError,
} from 'react-hook-form';

export interface FindProp {
  type: string
}

export interface EmailParams {
  email: string
  account? : string
}

export interface AccountParams {
  email: string,
  code: string
}

export interface FindParams {
  email: string;
  account?: string;
  code: string;
}

export interface RegisterProp {
  register: UseFormRegister<CodeInfo>,
  handleSubmit: UseFormHandleSubmit<CodeInfo>,
  setError: UseFormSetError<CodeInfo>,
  email: string,
  account?: string
}

export interface InputInfo {
  register: UseFormRegister<CodeInfo>,
  name: 'first' | 'second' | 'third' | 'fourth',
  inputRef: React.MutableRefObject<HTMLInputElement[] | null[]>,
  preventOverLength: (e: React.ChangeEvent<HTMLInputElement>, next: number) => void,
  number: number,
  index: number,
}

export interface CodeInfo {
  first: string,
  second: string,
  third: string,
  fourth: string,
}

export interface PasswordInfo {
  password: string,
  passwordCheck: string,
}
