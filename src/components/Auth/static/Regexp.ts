export const EMAIL_REGEXP = /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/;

export const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!@#$%^&*+=()]).{2,16}$/;

export const NICKNAME_REGEXP = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
