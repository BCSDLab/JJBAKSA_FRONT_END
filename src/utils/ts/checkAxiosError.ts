import axios, { AxiosError } from 'axios';

interface ServerErrorResponse {
  errorMessage: string;
}

// eslint-disable-next-line arrow-body-style
const checkAxiosErrorMessage = (error: any):error is AxiosError<ServerErrorResponse> => {
  return 'errorMessage' in error.response.data && axios.isAxiosError(error);
};

export default checkAxiosErrorMessage;
