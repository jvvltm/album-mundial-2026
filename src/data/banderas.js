// Mapeo de código FIFA → código flagcdn.com (ISO 3166-1 alpha-2 en minúsculas,
// o código de subdivisión para Escocia e Inglaterra)

const FIFA_A_FLAGCDN = {
  MEX: 'mx', ZAF: 'za', KOR: 'kr', CZE: 'cz', CAN: 'ca', BIH: 'ba',
  QAT: 'qa', SUI: 'ch', BRA: 'br', MAR: 'ma', HAI: 'ht', SCO: 'gb-sct',
  USA: 'us', PAR: 'py', AUS: 'au', TUR: 'tr', GER: 'de', CUW: 'cw',
  CIV: 'ci', ECU: 'ec', NED: 'nl', JPN: 'jp', SWE: 'se', TUN: 'tn',
  BEL: 'be', EGY: 'eg', IRN: 'ir', NZL: 'nz', ESP: 'es', CPV: 'cv',
  KSA: 'sa', URU: 'uy', FRA: 'fr', NOR: 'no', SEN: 'sn', IRQ: 'iq',
  ARG: 'ar', ALG: 'dz', AUT: 'at', JOR: 'jo', POR: 'pt', COD: 'cd',
  UZB: 'uz', COL: 'co', ENG: 'gb-eng', CRO: 'hr', GHA: 'gh', PAN: 'pa',
}

export const getBanderaUrl = (codigoFifa) => {
  const code = FIFA_A_FLAGCDN[codigoFifa]
  return code ? `https://flagcdn.com/w40/${code}.png` : null
}
