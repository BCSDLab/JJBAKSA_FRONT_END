import navSpriteSvg from 'assets/svg/common/nav-sprite.svg';

interface SpriteProps {
  id: string;
  height?: string;
  width?: string;
}

export default function SpriteSvg({ id, height = '24', width = '24' }:SpriteProps): JSX.Element {
  return (
    <svg height={height} width={width} fill="#FFFFFF">
      <use xlinkHref={`${navSpriteSvg}#${id}`} />
    </svg>
  );
}
