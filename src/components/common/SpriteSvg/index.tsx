import spriteSvg from 'assets/svg/common/sprite-svg.svg';

interface SpriteProps {
  id: string;
  height?: string;
  width?: string;
}

export default function SpriteSvg({ id, height = '24', width = '24' }:SpriteProps): JSX.Element {
  return (
    <svg height={height} width={width} fill="#FFFFFF">
      <use xlinkHref={`${spriteSvg}#${id}`} />
    </svg>
  );
}
