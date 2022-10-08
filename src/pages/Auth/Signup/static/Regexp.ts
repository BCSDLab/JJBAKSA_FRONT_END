export const EMAIL_REGEXP = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])/i;

export const EMAILDOMAIN_REGEXP = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const EMAIL_MOBILE_REGEXP = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!@#$%^&*+=()]).{2,16}$/;

export const NICKNAME_REGEXP = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
