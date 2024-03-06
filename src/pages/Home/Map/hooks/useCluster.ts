/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { ClusterHtml } from 'pages/Home/Map/components/MarkerHtml/index';
import MarkerClustering from 'utils/js/MarkerClustering';

interface ClusterProps {
  markerArray: (naver.maps.Marker | undefined)[];
  map: naver.maps.Map | null;
}

const HTMLMARKER = {
  content: ClusterHtml(),
  size: new naver.maps.Size(40, 40),
  anchor: new naver.maps.Point(20, 20),
};

function useCluster({ markerArray, map }: ClusterProps) {
  const [cluster, setCluster] = useState<any | null>(null);

  useEffect(() => {
    if (map && markerArray.length > 0) {
      const markerClustering = new MarkerClustering({
        minClusterSize: 2,
        maxZoom: 20,
        map,
        markers: markerArray,
        disableClickZoom: false,
        gridSize: 120,
        icons: [HTMLMARKER],
        indexGenerator: [120],
        stylingFunction: (clusterMarker: any, count: number) => {
          if (clusterMarker) {
            const firstChild = clusterMarker.getElement().querySelector('div:first-child');
            if (firstChild) {
              firstChild.innerHTML = count;
            }
          }
        },
      });

      setCluster(markerClustering);
    }
  }, [map, markerArray]);

  useEffect(() => {
    if (cluster) {
      cluster.setMap(null);
    }
  }, [map, markerArray]);

  return { cluster };
}

export default useCluster;
