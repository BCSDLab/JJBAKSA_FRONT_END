import defaultImage from 'assets/svg/common/favicon.svg';

import styles from './MarkerHtml.module.scss';

export function MarkerHtml(src:string | null, name:string) {
  return `
  <div class=${styles.container}>
    <div class=${styles.bubble}>
      <picture>
        <source srcset=${defaultImage} style="width: 45px; height: 45px; box-sizing: content-box; object-fit: contain;"/>
        <img src=${src || `${defaultImage}`} alt="음식점 사진" />
      </picture>
    </div>
    <div class=${styles.name}>${name}</div>
  </div>
  `;
}

export function ClickedMarkerHtml(src: string | null, name: string, placeId: string) {
  return `
    <a href="/shop/${placeId}" class=${styles['clicked-container']}>
      <div class=${styles['clicked-bubble']}>
        <picture>
          <source srcset=${defaultImage} style="width: 45px; height: 45px; box-sizing: content-box; object-fit: contain;"/>
          <img src=${src || `${defaultImage}`} alt="음식점 사진" />
        </picture>
      </div>
      <div class=${styles['clicked-name']}>${name}</div>
    </a>
  `;
}

export function ClusterHtml() {
  return `<div class=${styles.cluster}></div>`;
}
