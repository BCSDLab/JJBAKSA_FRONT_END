import Default from 'assets/images/search/defaultImg.png';
import MarkerLogo from 'assets/images/home/location-marker.png';
import Selected from 'assets/images/home/selected-marker.png';
import styles from './MarkerHtml.module.scss';

export function MarkerHtml(thumbnail:string | null, name:string, index:number) {
  return `
  <div class=${styles.container}>
    <img src=${MarkerLogo}  class=${styles.marker} alt="marker" />
      <div class=${styles.bubble}>
        <div class=${styles.bubble__photo}>
          <img src=${thumbnail || Default} alt=""/>
        </div>
        <div class=${styles.bubble__index}>
          ${!thumbnail ? index : ''}
          
        </div>
        <div class=${styles.bubble__name}>
          ${name}
        </div>
      </div>
      </div>
  `;
}

export function ClickedMarkerHtml(thumbnail:string | null, name:string, index:number) {
  return `
  <div class=${styles.continer}>
    <img src=${Selected} class=${styles['marker--clicked']}>
      <div class=${styles.bubble}>
        <div class=${styles['bubble__photo--clicked']}>
          <img src=${thumbnail || Default} alt="" />
        </div>
        <div class=${styles['bubble__index--clidked']}>
          ${!thumbnail ? index : ''}
        </div>
        <div class=${styles['bubble__name--clicked']}>
          ${name}
        </div>
      </div>
    </div>
  `;
}
