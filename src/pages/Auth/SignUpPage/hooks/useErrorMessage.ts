import { useEffect } from 'react';

export default function useErrorMessage({ errors }:any) {
  if (errors !== undefined || null) {
    // const errorArr = Object.entries(errors);
  }
  useEffect((): string | any => {
    if (window.innerWidth <= 575) {
      // 렌더링
    }
  }, []);
  return {
  // errorArr,
  };
}
