const currencyFormat = Intl.NumberFormat("ko-KR");
/**
 *
 * @param {number | string} money
 * @returns
 */
export const currencyOf = (money) => currencyFormat.format(money);
