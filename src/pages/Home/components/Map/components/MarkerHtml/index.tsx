import Default from 'assets/images/search/defaultImg.png';
import MarkerLogo from 'assets/images/home/location-marker.png';
import Selected from 'assets/images/home/selected-marker.png';
import styles from './MarkerHtml.module.scss';

export function MarkerHtml(defaultImg:string, name:string, index:number) {
  return `
  <div class=${styles.container}>
    <img src=${MarkerLogo}  class=${styles.marker}/>
      <div class=${styles.bubble}>
        <div class=${styles.bubble__photo}>
          <img src=${defaultImg} alt=""/>
        </div>
        <div class=${styles.bubble__index}>
          ${defaultImg === Default ? index : ''}
          
        </div>
        <div class=${styles.bubble__name}>
          ${name}
        </div>
      </div>
      </div>
  `;
}

export function ClickedMarkerHtml(defaultImg:string, name:string, index:number) {
  return `
  <div class=${styles.continer}>
    <img src=${Selected} class=${styles['marker--clicked']}>
      <div class=${styles.bubble}>
        <div class=${styles['bubble__photo--clicked']}>
          <img src=${defaultImg} alt="" />
        </div>
        <div class=${styles.bubble__index}>
          ${defaultImg === Default ? index : ''}
        </div>
        <div class=${styles['bubble__name--clicked']}>
          ${name}
        </div>
      </div>
    </div>
  `;
}
