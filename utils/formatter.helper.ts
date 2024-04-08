export const currencyRepresentation = (
  amount: string,
  currency = "inr"
): string => {
  try {
    if (Number.isNaN(Number(amount))) return "";
    const revAmount = amount.split(".");
    revAmount[0] = Number(revAmount[0]).toLocaleString("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    });
    const newCurrencyRepresentation = revAmount.join(".");
    return newCurrencyRepresentation;
  } catch (e) {
    const fallbackCurrencyRepresentation = Number(amount).toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "inr",
      }
    );
    return fallbackCurrencyRepresentation;
  }
};
