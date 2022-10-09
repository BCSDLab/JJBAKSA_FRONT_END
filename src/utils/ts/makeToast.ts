import { toast } from 'react-toastify';

const TOAST_TYPE = {
  default: 'DEFAULT',
  success: 'SUCCESS',
  info: 'INFO',
  error: 'ERROR',
  warning: 'WARNING',
} as const;

type ToastType = keyof typeof TOAST_TYPE;

const makeToast = (type: ToastType, message: string) => toast(message, {
  type: toast.TYPE[TOAST_TYPE[type]],
  position: 'top-center',
});

export default makeToast;
