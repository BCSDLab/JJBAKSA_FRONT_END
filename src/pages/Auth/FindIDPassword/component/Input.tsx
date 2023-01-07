import cn from 'utils/ts/classNames';
import style from 'pages/Auth/FindIDPassword/VerifyCode.module.scss';
import { InputInfo } from '../entity';

export default function Input({
  register, name, inputRef, preventOverLength, n, index,
}: InputInfo) {
  const inputRefCopy = inputRef;
  return (
    <input
      type="number"
      className={cn({ [style['form__input--block']]: true })}
      {...register(name, {
        required: true,
        maxLength: 1,
      })}
      ref={(e) => { register(name).ref(e); inputRefCopy.current[index] = e; }}
      onChange={(e) => preventOverLength(e, n)}
    />
  );
}
