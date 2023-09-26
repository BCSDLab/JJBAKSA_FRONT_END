const useClusterIcon = () => {
  const htmlMarker1 = {
    content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
    size: new naver.maps.Size(40, 40),
    anchor: new naver.maps.Point(20, 20),
  };

  const htmlMarker2 = {
    content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
    size: new naver.maps.Size(40, 40),
    anchor: new naver.maps.Point(20, 20),
  };
  const htmlMarker3 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
    size: new naver.maps.Size(40, 40),
    anchor: new naver.maps.Point(20, 20),
  };
  const htmlMarker4 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
    size: new naver.maps.Size(40, 40),
    anchor: new naver.maps.Point(20, 20),
  };
  const htmlMarker5 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
    size: new naver.maps.Size(40, 40),
    anchor: new naver.maps.Point(20, 20),
  };
  return {
    htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5,
  };
};

export default useClusterIcon;
