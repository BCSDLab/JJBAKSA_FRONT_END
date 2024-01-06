import usePin from 'components/common/SideNavigation/hooks/usePin';
import ImageCarousel from 'components/ImageCarousel';

interface PinProps {
  placeId : string | undefined;
}

export default function Pin({ placeId } : PinProps): JSX.Element {
  const { data } = usePin(String(placeId));

  return (
    <div>
      <ImageCarousel pathname="pin" imageUrls={data?.photos} />
      <div>{data?.category}</div>
      <div>{data?.name}</div>
    </div>
  );
}
