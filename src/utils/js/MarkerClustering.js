/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * Copyright 2016 NAVER Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * 마커 클러스터링을 정의합니다.
 * @param {Object} options 마커 클러스터링 옵션
 */

const { naver } = window;

function MarkerClustering(options) {
  // 기본 값입니다.
  this.DEFAULT_OPTIONS = {
    // 클러스터 마커를 올릴 지도입니다.
    map: null,
    // 클러스터 마커를 구성할 마커입니다.
    markers: [],
    // 클러스터 마커 클릭 시 줌 동작 여부입니다.
    disableClickZoom: true,
    // 클러스터를 구성할 최소 마커 수입니다.
    minClusterSize: 2,
    // 클러스터 마커로 표현할 최대 줌 레벨입니다. 해당 줌 레벨보다 높으면, 클러스터를 구성하고 있는 마커를 노출합니다.
    maxZoom: 13,
    // 클러스터를 구성할 그리드 크기입니다. 단위는 픽셀입니다.
    gridSize: 100,
    // 클러스터 마커의 아이콘입니다. NAVER Maps JavaScript API v3에서 제공하는 아이콘, 심볼, HTML 마커 유형을 모두 사용할 수 있습니다.
    icons: [],
    // 클러스터 마커의 아이콘 배열에서 어떤 아이콘을 선택할 것인지 인덱스를 결정합니다.
    indexGenerator: [10, 100, 200, 500, 1000],
    // 클러스터 마커의 위치를 클러스터를 구성하고 있는 마커의 평균 좌표로 할 것인지 여부입니다.
    averageCenter: false,
    // 클러스터 마커를 갱신할 때 호출하는 콜백함수입니다. 이 함수를 통해 클러스터 마커에 개수를 표현하는 등의 엘리먼트를 조작할 수 있습니다.
    stylingFunction() {},
  };

  this.clusters = [];

  this.mapRelations = null;
  this.markerRelations = [];

  this.setOptions(naver.maps.Util.extend({}, this.DEFAULT_OPTIONS, options), true);
  this.setMap(options.map || null);
}

naver.maps.Util.ClassExtend(MarkerClustering, naver.maps.OverlayView, {
  onAdd() {
    const map = this.getMap();

    this.mapRelations = naver.maps.Event.addListener(map, 'idle', naver.maps.Util.bind(this.onIdle, this));

    if (this.getMarkers().length > 0) {
      this.createClusters();
      this.updateClusters();
    }
  },

  draw: naver.maps.Util.noop,

  onRemove() {
    naver.maps.Event.removeListener(this.mapRelation);

    this.clearClusters();

    this.geoTree = null;
    this.mapRelation = null;
  },

  /**
 * 마커 클러스터링 옵션을 설정합니다. 설정한 옵션만 반영됩니다.
 * @param {Object | string} newOptions 옵션
 */
  setOptions(newOptions, ...args) {
    if (typeof newOptions === 'string') {
      const key = newOptions;
      const value = args[0];

      this.set(key, value);
    } else {
      const isFirst = args[0];

      naver.maps.Util.forEach(newOptions, (value, key) => {
        if (key !== 'map') {
          this.set(key, value);
        }
      });

      if (newOptions.map && !isFirst) {
        this.setMap(newOptions.map);
      }
    }
  },

  /**
 * 마커 클러스터링 옵션을 반환합니다. 특정 옵션 이름을 지정하지 않으면, 모든 옵션을 반환합니다.
 * @param {string} key 반환받을 옵션 이름
 * @return {Any} 옵션
 */
  getOptions(key) {
    const options = {};

    if (key !== undefined) {
      return this.get(key);
    }
    naver.maps.Util.forEach(this.DEFAULT_OPTIONS, (value, newKey) => {
      options[newKey] = this.get(newKey);
    });

    return options;
  },

  /**
 * 클러스터를 구성하는 최소 마커 수를 반환합니다.
 * @return {number} 클러스터를 구성하는 최소 마커 수
 */
  getMinClusterSize() {
    return this.getOptions('minClusterSize');
  },

  /**
 * 클러스터를 구성하는 최소 마커 수를 설정합니다.
 * @param {number} size 클러스터를 구성하는 최소 마커 수
 */
  setMinClusterSize(size) {
    this.setOptions('minClusterSize', size);
  },

  /**
 * 클러스터 마커를 노출할 최대 줌 레벨을 반환합니다.
 * @return {number} 클러스터 마커를 노출할 최대 줌 레벨
*/
  getMaxZoom() {
    return this.getOptions('maxZoom');
  },

  /**
 * 클러스터 마커를 노출할 최대 줌 레벨을 설정합니다.
 * @param {number} zoom 클러스터 마커를 노출할 최대 줌 레벨
 */
  setMaxZoom(zoom) {
    this.setOptions('maxZoom', zoom);
  },

  /**
 * 클러스터를 구성할 그리드 크기를 반환합니다. 단위는 픽셀입니다.
 * @return {number} 클러스터를 구성할 그리드 크기
 */
  getGridSize() {
    return this.getOptions('gridSize');
  },

  /**
 * 클러스터를 구성할 그리드 크기를 설정합니다. 단위는 픽셀입니다.
 * @param {number} size 클러스터를 구성할 그리드 크기
 */
  setGridSize(size) {
    this.setOptions('gridSize', size);
  },

  /**
 * 클러스터 마커의 아이콘을 결정하는 인덱스 생성기를 반환합니다.
 * @return {Array | Function} 인덱스 생성기
 */
  getIndexGenerator() {
    return this.getOptions('indexGenerator');
  },

  /**
 * 클러스터 마커의 아이콘을 결정하는 인덱스 생성기를 설정합니다.
 * @param {Array | Function} indexGenerator 인덱스 생성기
 */
  setIndexGenerator(indexGenerator) {
    this.setOptions('indexGenerator', indexGenerator);
  },

  /**
 * 클러스터로 구성할 마커를 반환합니다.
 * @return {Array.<naver.maps.Marker>} 클러스터로 구성할 마커
 */
  getMarkers() {
    return this.getOptions('markers');
  },

  /**
 * 클러스터로 구성할 마커를 설정합니다.
 * @param {Array.<naver.maps.Marker>} markers 클러스터로 구성할 마커
 */
  setMarkers(markers) {
    this.setOptions('markers', markers);
  },

  /**
 * 클러스터 마커 아이콘을 반환합니다.
 * @return {Array.<naver.maps.Marker~ImageIcon | naver.maps.Marker~SymbolIcon
 * | naver.maps.Marker~HtmlIcon>} 클러스터 마커 아이콘
 */
  getIcons() {
    return this.getOptions('icons');
  },

  /**
 * 클러스터 마커 아이콘을 설정합니다.
 * @param {Array.<naver.maps.Marker~ImageIcon | naver.maps.Marker~SymbolIcon |
 * naver.maps.Marker~HtmlIcon>} icons 클러스터 마커 아이콘
 */
  setIcons(icons) {
    this.setOptions('icons', icons);
  },

  /**
 * 클러스터 마커의 엘리먼트를 조작할 수 있는 스타일링 함수를 반환합니다.
 * @return {Funxtion} 콜백함수
 */
  getStylingFunction() {
    return this.getOptions('stylingFunction');
  },

  /**
 * 클러스터 마커의 엘리먼트를 조작할 수 있는 스타일링 함수를 설정합니다.
 * @param {Function} func 콜백함수
 */
  setStylingFunction(func) {
    this.setOptions('stylingFunction', func);
  },

  /**
 * 클러스터 마커를 클릭했을 때 줌 동작 수행 여부를 반환합니다.
 * @return {boolean} 줌 동작 수행 여부
 */
  getDisableClickZoom() {
    return this.getOptions('disableClickZoom');
  },

  /**
 * 클러스터 마커를 클릭했을 때 줌 동작 수행 여부를 설정합니다.
 * @param {boolean} flag 줌 동작 수행 여부
 */
  setDisableClickZoom(flag) {
    this.setOptions('disableClickZoom', flag);
  },

  /**
 * 클러스터 마커의 위치를 클러스터를 구성하고 있는 마커의 평균 좌표로 할 것인지 여부를 반환합니다.
 * @return {boolean} 평균 좌표로 클러스터링 여부
 */
  getAverageCenter() {
    return this.getOptions('averageCenter');
  },

  /**
 * 클러스터 마커의 위치를 클러스터를 구성하고 있는 마커의 평균 좌표로 할 것인지 여부를 설정합니다.
 * @param {boolean} averageCenter 평균 좌표로 클러스터링 여부
 */
  setAverageCenter(averageCenter) {
    this.setOptions('averageCenter', averageCenter);
  },

  // KVO 이벤트 핸들러
  changed(key, value) {
    let exec = 'enableClickZoom';
    if (!this.getMap()) return;

    switch (key) {
      case 'marker':
      case 'minClusterSize':
      case 'gridSize':
      case 'averageCenter':
        this.redraw();
        break;
      case 'indexGenerator':
      case 'icons':
        this.clusters.forEach((cluster) => {
          cluster.updateIcon();
        });
        break;
      case 'maxZoom':
        this.clusters.forEach((cluster) => {
          if (cluster.getCount() > 1) {
            cluster.checkByZoomAndMinClusterSize();
          }
        });
        break;
      case 'stylingFunction':
        this.clusters.forEach((cluster) => {
          cluster.updateCount();
        });
        break;
      case 'disableClickZoom':
        if (value) {
          exec = 'disableClickZoom';
        }

        this.clusters.forEach((cluster) => {
          cluster[exec]();
        });
        break;
      default:
        break;
    }
  },

  /**
 * 현재 지도 경계 영역 내의 마커에 대해 클러스터를 생성합니다.
 * @private
 */
  createClusters() {
    const map = this.getMap();

    if (!map) return;

    const bounds = map.getBounds();
    const markers = this.getMarkers();

    for (let i = 0, ii = markers.length; i < ii; i += 1) {
      const marker = markers[i];
      const position = marker.getPosition();

      if (bounds.hasLatLng(position)) {
        const closestCluster = this.getClosestCluster(position);
        closestCluster.addMarker(marker);
        this.markerRelations.push(naver.maps.Event.addListener(marker, 'dragend', naver.maps.Util.bind(this.onDragEnd, this)));
      }

      const closestCluster = this.getClosestCluster(position);

      closestCluster.addMarker(marker);

      this.markerRelations.push(naver.maps.Event.addListener(marker, 'dragend', naver.maps.Util.bind(this.onDragEnd, this)));
    }
  },

  /**
 * 클러스터의 아이콘, 텍스트를 갱신합니다.
 * @private
 */
  updateClusters() {
    const { clusters } = this;

    for (let i = 0, ii = clusters.length; i < ii; i += 1) {
      clusters[i].updateCluster();
    }
  },

  /**
 * 클러스터를 모두 제거합니다.
 * @private
 */
  clearClusters() {
    const { clusters } = this;

    for (let i = 0, ii = clusters.length; i < ii; i += 1) {
      clusters[i].destroy();
    }

    naver.maps.Event.removeListener(this.markerRelations);

    this.markerRelations = [];
    this.clusters = [];
  },

  /**
 * 생성된 클러스터를 모두 제거하고, 다시 생성합니다.
 * @private
 */
  redraw() {
    this.clearClusters();
    this.createClusters();
    this.updateClusters();
  },

  /**
 * 전달된 위/경도에서 가장 가까운 클러스터를 반환합니다. 없으면 새로 클러스터를 생성해 반환합니다.
 * @param {naver.maps.LatLng} position 위/경도
 * @return {Cluster} 클러스터
 */
  getClosestCluster(position) {
    const proj = this.getProjection();
    const { clusters } = this;
    let closestCluster = null;
    let distance = Infinity;

    for (let i = 0, ii = clusters.length; i < ii; i += 1) {
      const cluster = clusters[i];
      const center = cluster.getCenter();

      if (cluster.isInBounds(position)) {
        const delta = proj.getDistance(center, position);

        if (delta < distance) {
          distance = delta;
          closestCluster = cluster;
        }
      }
    }

    if (!closestCluster) {
      closestCluster = new Cluster(this);
      this.clusters.push(closestCluster);
    }

    return closestCluster;
  },

  /**
 * 지도의 Idle 상태 이벤트 핸들러입니다.
 */
  onIdle() {
    this.redraw();
  },

  /**
 * 각 마커의 드래그 종료 이벤트 핸들러입니다.
 */
  onDragEnd() {
    this.redraw();
  },
});

/**
 * 마커를 가지고 있는 클러스터를 정의합니다.
 * @param {MarkerClustering} markerClusterer
 */
let Cluster = function (markerClusterer) {
  this.clusterCenter = null;
  this.clusterBounds = null;
  this.clusterMarker = null;
  this.relation = null;

  this.clusterMember = [];

  this.markerClusterer = markerClusterer;
};

Cluster.prototype = {
  constructor: Cluster,

  /**
 * 클러스터에 마커를 추가합니다.
 * @param {naver.maps.Marker} marker 클러스터에 추가할 마커
 */
  addMarker(marker) {
    if (this.isMember(marker)) return;

    if (!this.clusterCenter) {
      const position = marker.getPosition();

      this.clusterCenter = position;
      this.clusterBounds = this.calcBounds(position);
    }

    this.clusterMember.push(marker);
  },

  /**
 * 클러스터를 제거합니다.
 */
  destroy() {
    naver.maps.Event.removeListener(this.relation);

    const members = this.clusterMember;

    for (let i = 0, ii = members.length; i < ii; i += 1) {
      members[i].setMap(null);
    }

    this.clusterMarker.setMap(null);

    this.clusterMarker = null;
    this.clusterCenter = null;
    this.clusterBounds = null;
    this.relation = null;

    this.clusterMember = [];
  },

  /**
 * 클러스터 중심점을 반환합니다.
 * @return {naver.maps.LatLng} 클러스터 중심점
 */
  getCenter() {
    return this.clusterCenter;
  },

  /**
 * 클러스터 경계 영역을 반환합니다.
 * @return {naver.maps.LatLngBounds} 클러스터 경계 영역
 */
  getBounds() {
    return this.clusterBounds;
  },

  /**
 * 클러스터를 구성하는 마커 수를 반환합니다.
 * @return {number} 클러스터를 구성하는 마커 수
 */
  getCount() {
    return this.clusterMember.length;
  },

  /**
 * 현재의 클러스터 멤버 마커 객체를 반환합니다.
 * @return {naver.maps.Marker[]} 클러스터를 구성하는 마커 객체 집합
 */
  getClusterMember() {
    return this.clusterMember;
  },

  /**
 * 전달된 위/경도가 클러스터 경계 영역 내에 있는지 여부를 반환합니다.
 * @param {naver.maps.LatLng} latlng 위/경도
 * @return {boolean} 클러스터 경계 영역 내의 위치 여부
 */
  isInBounds(latlng) {
    return this.clusterBounds && this.clusterBounds.hasLatLng(latlng);
  },

  /**
 * 클러스터 마커 클릭 시 줌 동작을 수행하도록 합니다.
 */
  enableClickZoom() {
    if (this.relation) return;

    const map = this.markerClusterer.getMap();

    this.relation = naver.maps.Event.addListener(this.clusterMarker, 'click', naver.maps.Util.bind((e) => {
      map.morph(e.coord, map.getZoom() + 1);
    }, this));
  },

  /**
 * 클러스터 마커 클릭 시 줌 동작을 수행하지 않도록 합니다.
 */
  disableClickZoom() {
    if (!this.relation) return;

    naver.maps.Event.removeListener(this.relation);
    this.relation = null;
  },

  /**
 * 클러스터 마커가 없으면 클러스터 마커를 생성하고, 클러스터 마커를 갱신합니다.
  * - 클러스터 마커 아이콘
  * - 마커 개수
  * - 클러스터 마커 노출 여부
  */
  updateCluster() {
    if (!this.clusterMarker) {
      let position;

      if (this.markerClusterer.getAverageCenter()) {
        position = this.calcAverageCenter(this.clusterMember);
      } else {
        position = this.clusterCenter;
      }

      this.clusterMarker = new naver.maps.Marker({
        position,
        map: this.markerClusterer.getMap(),
      });

      if (!this.markerClusterer.getDisableClickZoom()) {
        this.enableClickZoom();
      }
    }

    this.updateIcon();
    this.updateCount();

    this.checkByZoomAndMinClusterSize();
  },

  /**
 * 조건에 따라 클러스터 마커를 노출하거나, 노출하지 않습니다.
 */
  checkByZoomAndMinClusterSize() {
    const clusterer = this.markerClusterer;
    const minClusterSize = clusterer.getMinClusterSize();
    const maxZoom = clusterer.getMaxZoom();
    const currentZoom = clusterer.getMap().getZoom();

    if (this.getCount() < minClusterSize) {
      this.showMember();
    } else {
      this.hideMember();

      if (maxZoom <= currentZoom) {
        this.showMember();
      }
    }
  },

  /**
 * 클러스터를 구성하는 마커 수를 갱신합니다.
 */
  updateCount() {
    const stylingFunction = this.markerClusterer.getStylingFunction();

    if (stylingFunction) {
      stylingFunction(this.clusterMarker, this.getCount());
    }
  },

  /**
 * 클러스터 마커 아이콘을 갱신합니다.
 */
  updateIcon() {
    const count = this.getCount();
    let index = this.getIndex(count);
    const icons = this.markerClusterer.getIcons();

    index = Math.max(index, 0);
    index = Math.min(index, icons.length - 1);

    this.clusterMarker.setIcon(icons[index]);
  },

  /**
 * 클러스터를 구성하는 마커를 노출합니다. 이때에는 클러스터 마커를 노출하지 않습니다.
 * @private
 */
  showMember() {
    const map = this.markerClusterer.getMap();
    const marker = this.clusterMarker;
    const members = this.clusterMember;

    for (let i = 0, ii = members.length; i < ii; i += 1) {
      members[i].setMap(map);
    }

    if (marker) {
      marker.setMap(null);
    }
  },

  /**
 * 클러스터를 구성하는 마커를 노출하지 않습니다. 이때에는 클러스터 마커를 노출합니다.
 * @private
 */
  hideMember() {
    const map = this.markerClusterer.getMap();
    const marker = this.clusterMarker;
    const members = this.clusterMember;

    for (let i = 0, ii = members.length; i < ii; i += 1) {
      members[i].setMap(null);
    }

    if (marker && !marker.getMap()) {
      marker.setMap(map);
    }
  },

  /**
 * 전달된 위/경도를 중심으로 그리드 크기만큼 확장한 클러스터 경계 영역을 반환합니다.
  * @param {naver.maps.LatLng} position 위/경도
  * @return {naver.maps.LatLngBounds} 클러스터 경계 영역
  * @private
  */
  calcBounds(position) {
    const map = this.markerClusterer.getMap();
    const bounds = new naver.maps.LatLngBounds(position.clone(), position.clone());
    const mapBounds = map.getBounds();
    const proj = map.getProjection();
    const map_max_px = proj.fromCoordToOffset(mapBounds.getNE());
    const map_min_px = proj.fromCoordToOffset(mapBounds.getSW());
    const max_px = proj.fromCoordToOffset(bounds.getNE());
    const min_px = proj.fromCoordToOffset(bounds.getSW());
    const gridSize = this.markerClusterer.getGridSize() / 2;

    max_px.add(gridSize, -gridSize);
    min_px.add(-gridSize, gridSize);

    const max_px_x = Math.min(map_max_px.x, max_px.x);
    const max_px_y = Math.max(map_max_px.y, max_px.y);
    const min_px_x = Math.max(map_min_px.x, min_px.x);
    const min_px_y = Math.min(map_min_px.y, min_px.y);
    const newMax = proj.fromOffsetToCoord(new naver.maps.Point(max_px_x, max_px_y));
    const newMin = proj.fromOffsetToCoord(new naver.maps.Point(min_px_x, min_px_y));

    return new naver.maps.LatLngBounds(newMin, newMax);
  },

  /**
 * 클러스터를 구성하는 마커 수에 따라 노출할 아이콘을 결정하기 위한 인덱스를 반환합니다.
 * @param {number} count 클러스터를 구성하는 마커 수
 * @return {number} 인덱스
 * @private
 */
  getIndex(count) {
    const indexGenerator = this.markerClusterer.getIndexGenerator();

    if (naver.maps.Util.isFunction(indexGenerator)) {
      return indexGenerator(count);
    } if (naver.maps.Util.isArray(indexGenerator)) {
      let index = 0;

      for (let i = index, ii = indexGenerator.length; i < ii; i += 1) {
        const factor = indexGenerator[i];

        if (count < factor) break;

        index += 1;
      }

      return index;
    }

    return 0;
  },

  /**
 * 전달된 마커가 이미 클러스터에 속해 있는지 여부를 반환합니다.
 * @param {naver.maps.Marker} marker 마커
 * @return {boolean} 클러스터에 속해 있는지 여부
 * @private
 */
  isMember(marker) {
    return this.clusterMember.indexOf(marker) !== -1;
  },

  /**
 * 전달된 마커들의 중심 좌표를 반환합니다.
 * @param {Array.<naver.maps.Marker>} markers 마커 배열
 * @return {naver.maps.Point} 마커들의 중심 좌표
 * @private
 */
  calcAverageCenter(markers) {
    const numberOfMarkers = markers.length;
    const averageCenter = [0, 0];

    for (let i = 0; i < numberOfMarkers; i += 1) {
      averageCenter[0] += markers[i].position.x;
      averageCenter[1] += markers[i].position.y;
    }

    averageCenter[0] /= numberOfMarkers;
    averageCenter[1] /= numberOfMarkers;

    return new naver.maps.Point(averageCenter[0], averageCenter[1]);
  },

};

export default MarkerClustering;
