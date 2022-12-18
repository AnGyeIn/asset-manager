export enum PageTabKey {
  ACCOUNT_BOOK = "ACCOUNT_BOOK",
  STOCKS = "STOCKS",
  ADMINISTRATION = "ADMINISTRATION",
}

export const pageTabs = [
  {
    tabKey: PageTabKey.ACCOUNT_BOOK,
    label: "가계부",
  },
  {
    tabKey: PageTabKey.STOCKS,
    label: "주식",
  },
  {
    tabKey: PageTabKey.ADMINISTRATION,
    label: "관리비",
  },
];
