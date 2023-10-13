interface PinProps {
  selected : naver.maps.Marker;
}

export default function Pin({ selected } : PinProps): JSX.Element {
  return (
    <div>
      {selected.getTitle()}
    </div>
  );
}
