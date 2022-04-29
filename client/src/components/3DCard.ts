const getOffset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  let el: any = e.currentTarget;
  const bbox = el.getBoundingClientRect();
  const x = e.clientX - bbox.left;
  const y = e.clientY - bbox.top;
  return { x, y };
};

export const handleCardMouseMove = (
  e: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  const el = e.currentTarget;

  /* Get the height and width of the element */
  const height = el.clientHeight;
  const width = el.clientWidth;

  /*
   * Get position of mouse cursor
   * With respect to the element
   * On mouseover
   */
  const pos = getOffset(e);
  /* Store the x position */
  const xVal = pos.x;
  /* Store the y position */
  const yVal = pos.y;

  /*
   * Calculate rotation valuee along the Y-axis
   * Here the multiplier 20 is to
   * Control the rotation
   * You can change the value and see the results
   */
  const yRotation = 20 * ((xVal - width / 2) / width);

  /* Calculate the rotation along the X-axis */
  const xRotation = -20 * ((yVal - height / 2) / height);

  /* Generate string for CSS transform property */
  const transformStr =
    "perspective(500px) scale(1.1) rotateX(" +
    xRotation +
    "deg) rotateY(" +
    yRotation +
    "deg)";

  /* Apply the calculated transformation */
  el.style.transform = transformStr;
};

export const handleCardMouseOut = (
  e: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  const el = e.currentTarget;
  el.style.transform = "perspective(500px) scale(1) rotateX(0) rotateY(0)";
};
export const handleCardMouseDown = (
  e: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  const el = e.currentTarget;
  el.style.transform = "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
};
export const handleCardMouseUp = (
  e: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  const el = e.currentTarget;
  el.style.transform = "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
};
