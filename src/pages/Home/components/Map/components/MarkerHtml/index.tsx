import Default from 'assets/images/search/defaultImg.png';
import MarkerLogo from 'assets/svg/home/location-marker.svg';
import styles from './MarkerHtml.module.scss';

export function MarkerHtml(defaultImg:string, name:string, index:number) {
  return `
    <img src=${MarkerLogo} class=${styles.marker}>
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
    </img>
  `;
}

export function ClickedMarkerHtml(defaultImg:string, name:string, index:number) {
  return `
    <img src=${MarkerLogo} class=${styles['marker--clicked']}>
      <div class=${styles.bubble}>
        <div class=${styles.bubble__photo}>
          <img src=${defaultImg} alt="" />
        </div>
        <div class=${styles.bubble__index}>
          ${defaultImg === Default ? index : ''}
        </div>
        <div class=${styles.bubble__name}>
          ${name}
        </div>
      </div>
    </img>
  `;
}
