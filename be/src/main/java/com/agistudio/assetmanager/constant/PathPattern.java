package com.agistudio.assetmanager.constant;

import lombok.experimental.UtilityClass;

@UtilityClass
public class PathPattern {

  private static final String BASE = "/v0";

  public static final String ACCOUNT_BOOK = BASE + "/accountBook";
  public static final String ACCOUNT_BOOKS_YEARS_AND_MONTHS = ACCOUNT_BOOK + "s/yearsAndMonths";
  public static final String ACCOUNT_BOOK_ENTRY_UNKNOWN = ACCOUNT_BOOK + "Entry";
  public static final String ACCOUNT_BOOK_ENTRIES = ACCOUNT_BOOK + "Entries";
  public static final String ACCOUNT_BOOK_ENTRIES_TITLES_AND_DESCRIPTIONS = ACCOUNT_BOOK_ENTRIES
      + "/titlesAndDescriptions";
  public static final String ACCOUNT_BOOK_ENTRY = ACCOUNT_BOOK_ENTRIES + "/{accountBookEntryId}";

  public static final String REPEATED_ACCOUNT_BOOK_ENTRY_UNKNOWN = BASE + "/repeatedAccountBookEntry";
  public static final String REPEATED_ACCOUNT_BOOK_ENTRIES = BASE + "/repeatedAccountBookEntries";
  public static final String REPEATED_ACCOUNT_BOOK_ENTRY = REPEATED_ACCOUNT_BOOK_ENTRIES
      + "/{repeatedAccountBookEntryId}";

  public static final String PRESERVATION_UNKNOWN = BASE + "/preservation";
  public static final String PRESERVATIONS = PRESERVATION_UNKNOWN + "s";
  public static final String PRESERVATION = PRESERVATIONS + "/{preservationId}";

  public static final String STOCKS_UNKNOWN = BASE + "/stocks";
  public static final String STOCKS = STOCKS_UNKNOWN + "/{code}";

  public static final String STOCKS_ACCOUNT_UNKNOWN = STOCKS_UNKNOWN + "Account";
  public static final String STOCKS_ACCOUNTS = STOCKS_ACCOUNT_UNKNOWN + "s";
  public static final String STOCKS_ACCOUNT = STOCKS_ACCOUNTS + "/{stocksAccountId}";

}
