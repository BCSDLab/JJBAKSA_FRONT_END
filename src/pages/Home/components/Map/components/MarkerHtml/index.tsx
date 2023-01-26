import styles from './MarkerHtml.module.scss';

export function MarkerHtml(defaultImg:string, name:string) {
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

export function ClickedMarkerHtml(defaultImg:string, name:string) {
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
