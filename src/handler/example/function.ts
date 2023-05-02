
export const sterr = (R: number, W: number, L: number) => {
  let standarderror;
if (W === 0) {
  standarderror = Math.sqrt(L / ((R - 0.5) * (W + 0.5)));
} else if (R === 0) {
  standarderror = Math.sqrt(L / ((R + 0.5) * (W - 0.5)));
} else {
  standarderror = Math.sqrt(L / (R * W));
}
return Math.round(standarderror * 100000) / 100000;
}
export const _measure = (H: number, L: number, R: number, W: number) => {
  let measure;
  if (W === 0) {
    measure = (H / L) + Math.log((R - 0.5) / (W + 0.5))
  } else if (R === 0) {
    measure = (H / L) + Math.log((R + 0.5) / (W - 0.5));
  } else {
    measure = (H / L) + Math.log((R / W));
  }
  return Math.round(measure * 100000) / 100000;
}
export const standard_error = (R: number, W: number, L: number) => {
  let E = Math.exp(-1 * sterr(R, W, L));
  const sum = ((1 / (1 + E)) - 0.5) * 100;
  return +(sum.toFixed(1))
}
export const ability_measure = (H: number, L: number, R: number, W: number) => {
  let measure_i = _measure(H, L, R, W)
  let abilityfraction = 1 / (1 + Math.exp(-1 * measure_i))
  return parseFloat((((3 - 1) * abilityfraction) + 1).toFixed(2))
}

export const Compare_measure_B = (H: number, L: number, R: number, W: number) => {
  let b = _measure(H, L, R, W)
  if (L > 9) {
    if ((2.5 - sterr(R, W, L)) < b && b < (2.5 + sterr(R, W, L))) {
      return 1
    }
    if ((_measure(H, L, R, W) - sterr(R, W, L)) > 2.5) {
      return 2
    }
    if (_measure(H, L, R, W) + sterr(R, W, L) < 2.5) {
      return 3
    }
  }
  return 1
}