interface IClassname {
  [key: string]: boolean;
}

const classNames = (classes: IClassname) => Object.entries(classes)
  .filter(([, value]) => value)
  .map(([key]) => key)
  .join(' ');

export default classNames;
