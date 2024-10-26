function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "BTN",
  }).format(value);
}
export default formatCurrency;