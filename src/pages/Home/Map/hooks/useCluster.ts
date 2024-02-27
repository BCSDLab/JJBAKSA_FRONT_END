/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { ClusterHtml } from 'pages/Home/Map/components/MarkerHtml/index';
import MarkerClustering from 'utils/js/MarkerClustering';

interface ClusterProps {
  markerArray: (naver.maps.Marker | undefined)[];
  map: naver.maps.Map | null;
}

function useCluster({ markerArray, map } : ClusterProps) {
  const htmlMarker = {
    content: ClusterHtml(),
    size: new naver.maps.Size(40, 40),
    anchor: new naver.maps.Point(20, 20),
  };

  const getCluster = () => {
    const markerList = markerArray.map((_marker) => _marker);
    const cluster = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 21,
      map,
      markers: markerList.filter((marker) => marker),
      disableClickZoom: false,
      gridSize: 120,
      icons: [htmlMarker],
      indexGenerator: [120],
      stylingFunction(clusterMarker: any, count: number) {
        clusterMarker.getElement().querySelector('div:first-child').innerText = count;
      },
    });

    return cluster;
  };

  const [cluster, setCluster] = useState(getCluster());

  useEffect(() => {
    const newCluster = getCluster();
    setCluster(newCluster);
  }, []);

  return { cluster };
}
export default useCluster;
