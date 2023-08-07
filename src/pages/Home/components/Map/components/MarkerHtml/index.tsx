import Default from 'assets/images/search/default-image.png';
import MarkerLogo from 'assets/images/home/location-marker.png';
import Selected from 'assets/images/home/selected-marker.png';
import styles from './MarkerHtml.module.scss';

export function MarkerHtml(photo:string[] | null, name:string) {
  return `
  <div class=${styles.container}>
    <img src=${MarkerLogo}  class=${styles.marker} alt="marker" />
      <div class=${styles.bubble}>
        <div class=${styles.bubble__photo}>
          <img src=${Default} alt="사진"/>
        </div>
        <div class=${styles.bubble__name}>
          ${name}
        </div>
      </div>
      </div>
  `;
}

export function ClickedMarkerHtml(photo:string[] | null, name:string) {
  return `
  <div class=${styles.continer}>
    <img src=${Selected} class=${styles['marker--clicked']}>
      <div class=${styles.bubble}>
        <div class=${styles['bubble__photo--clicked']}>
          <img src=${Default} alt="사진" />
        </div>
        <div class=${styles['bubble__name--clicked']}>
          ${name}
        </div>
      </div>
    </div>
  `;
}
