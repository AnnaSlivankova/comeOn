declare module '*.module.scss' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}