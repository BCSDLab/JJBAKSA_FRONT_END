import defaultImage from 'assets/svg/common/favicon.svg';

import styles from './MarkerHtml.module.scss';

export function MarkerHtml(name:string) {
  return `
  <div class=${styles.container}>
    <div class=${styles.bubble}>
      <img src=${defaultImage} alt="음식점" />
    </div>
    <div class=${styles.name}>${name}</div>
  </div>
  `;
}

export function ClickedMarkerHtml(name: string, placeId: string) {
  return `
    <a href="/shop/${placeId}" class=${styles['clicked-container']}>
      <div class=${styles['clicked-bubble']}>
        <img src=${defaultImage} alt="음식점" />
      </div>
      <div class=${styles['clicked-name']}>${name}</div>
    </a>
  `;
}

export function ClusterHtml() {
  return `<div class=${styles.cluster}></div>`;
}
