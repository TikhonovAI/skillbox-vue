export default function numberFormat(value) {
  let result;

  if (typeof value === 'number') {
    result = value;
  } else {
    result = 0;
  }
  return new Intl.NumberFormat().format(result);
}
