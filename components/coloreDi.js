const COLORI = ["#FFC233", "#5ED1C6", "#FF8FA3", "#B7A8FF"];

export function coloreDi(indice) {
  return COLORI[indice % COLORI.length];
}

