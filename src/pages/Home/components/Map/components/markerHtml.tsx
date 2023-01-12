import styles from '../Map.module.scss';

export function markerHtml(defaultImg:string, name:string) {
  return `
    <div class=${styles.bubble}>
      <div class=${styles.bubble__text}>
        <img src=${defaultImg} alt="음식 이미지" />
        <span>
          ${name}
        </span>
      </div>
      <div class=${styles.triangle}>
        <div class=${styles.triangle__background} />
        <div class=${styles.triangle__color} />
      </div>
    </div>
  `;
}

export function clickedMarkerHtml(defaultImg:string, name:string) {
  return `
    <div class=${styles['bubble--clicked']}>
      <div class=${styles.bubble__text}>
        <img src=${defaultImg} alt="음식 이미지" />
        <span>
          ${name}
        </span>
      </div>
      <div class=${styles.triangle}>
        <div class=${styles.triangle__background} />
        <div class=${styles['triangle__color--clicked']} />
      </div>
    </div>
  `;
}