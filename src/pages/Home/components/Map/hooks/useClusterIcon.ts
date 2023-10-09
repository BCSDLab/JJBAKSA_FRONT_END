import { ClusterHtml } from '../components/MarkerHtml';

const useClusterIcon = () => {
  const htmlMarker = {
    content: ClusterHtml(),
    size: new naver.maps.Size(40, 40),
    anchor: new naver.maps.Point(20, 20),
  };

  return htmlMarker;
};

export default useClusterIcon;
