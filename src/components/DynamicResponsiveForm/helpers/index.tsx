export const rqMsg = (label?: string) => {
  if (label) {
    return `${label} es requerido`;
  }
  return "Este campo es requerido";
};