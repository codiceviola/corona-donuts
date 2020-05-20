import * as d3 from "d3";

const getArcs = (field, valid_keys, entries) => {
  const nested = d3
    .nest()
    .key((d) => d[field])
    .rollup((v) => v.length)
    .entries(entries)
    .filter((d) => valid_keys.includes(d.key));

  const flatten = [
    nested.reduce((r, n) => {
      r[n.key] = n.value;
      return r;
    }, {}),
  ];

  const arcs = nested.reduce((r, n) => {
    r.push({ label: n.key, size: n.value, color: "#ff8882" });
    return r;
  }, []);

  return arcs;
};

export const chemioterapy = (data) =>
  getArcs(
    "chemioterapy",
    [
      "Chemioterapia interrotta del tutto",
      "Gli appuntamenti di chemioterapia sono rimasti invariati",
      "Chemioterapia rinviata di pochi giorni",
      "Chemioterapia rinviata a data da destinarsi",
    ],
    data
  );

export const firstVisit = (data) =>
  getArcs(
    "first_visit",
    [
      "L’appuntamento è rimasto invariato",
      "Visita rinviata di pochi giorni",
      "Visita rinviata a data da destinarsi",
    ],
    data
  );

export const controlVisit = (data) =>
  getArcs(
    "control_visit",
    [
      "L’appuntamento è rimasto invariato",
      "Visita rinviata di pochi giorni",
      "Visita rinviata a data da destinarsi",
      "Visita rinviata per impossibilità di avere in tempo referti diagnostici",
    ],
    data
  );

export const surgery = (data) =>
  getArcs(
    "surgery",
    [
      "La data dell’intervento chirurgico è rimasta invariata",
      "Intervento chirurgico rinviato di pochi giorni",
      "Intervento chirurgico rinviato a data da destinarsi",
    ],
    data
  );

export const lab = (data) =>
  getArcs(
    "lab",
    [
      "È rimasto tutto invariato.",
      "Prelievo/esame diagnostico rinviato di pochi giorni",
      "Prelievo/esame diagnostico rinviato a data da destinarsi",
      "Prelievo/esame diagnostico annullato",
    ],
    data
  );

export const covid = (data) =>
  getArcs(
    "covid",
    [
      "Avrà poche ripercussioni",
      "Avrà ripercussioni negative sulle tue terapie?",
      "Non avrà alcuna ripercussione",
      "Ti impedirà di curarti?",
    ],
    data
  );
