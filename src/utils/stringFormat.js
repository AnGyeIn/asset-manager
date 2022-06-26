const currencyFormat = Intl.NumberFormat("ko-KR");
/**
 *
 * @param {int} money
 * @returns
 */
export const currencyOf = (money) => currencyFormat.format(money);
