export const numberFormats = {
  en: {
    currency: {
      style: "currency",
      currency: "USD",
      notation: "standard",
    },
    decimal: {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: "percent",
      useGrouping: false,
    },
  },
  fr: {
    currency: {
      style: "currency",
      currency: "USD",
      notation: "standard",
    },
    decimal: {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    percent: {
      style: "percent",
      useGrouping: false,
    },
  },
  // ar: {
  // currency: {
  //   style: "currency",
  //   currency: "USD",
  //   notation: "standard",
  // },
  // decimal: {
  //   style: "decimal",
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // },
  // percent: {
  //   style: "percent",
  //   useGrouping: false,
  // },
  // },
} as const
