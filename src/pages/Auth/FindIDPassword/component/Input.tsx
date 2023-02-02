import cn from 'utils/ts/classNames';
import style from 'pages/Auth/FindIDPassword/VerifyCode.module.scss';
import { InputInfo } from '../entity';

export default function Input({
  register, name, preventOverLength, number, index, inputRef,
}: InputInfo) {
  return (
    <input
      type="number"
      className={cn({ [style['form__input--block']]: true })}
      {...register(name, {
        required: true,
        maxLength: 1,
      })}
      // eslint-disable-next-line
      ref={(e) => { register(name).ref(e); inputRef.current[index] = e; }}
      onChange={(e) => preventOverLength(e, number)}
    />
  );
}
