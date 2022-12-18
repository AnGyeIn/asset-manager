package com.agistudio.assetmanager.constant;

import lombok.experimental.UtilityClass;

@UtilityClass
public class PathPattern {

  private static final String BASE = "/v0";

  public static final String ACCOUNT_BOOK = BASE + "/accountBook";
  public static final String ACCOUNT_BOOKS_YEARS_AND_MONTHS = ACCOUNT_BOOK + "s/yearsAndMonths";
  public static final String ACCOUNT_BOOK_ENTRY_UNKNOWN = ACCOUNT_BOOK + "Entry";
  public static final String ACCOUNT_BOOK_ENTRIES = ACCOUNT_BOOK + "Entries";
  public static final String ACCOUNT_BOOK_ENTRY = ACCOUNT_BOOK_ENTRIES + "/{accountBookEntryId}";

  public static final String REPEATED_ACCOUNT_BOOK_ENTRY_UNKNOWN = BASE + "/repeatedAccountBookEntry";
  public static final String REPEATED_ACCOUNT_BOOK_ENTRIES = BASE + "/repeatedAccountBookEntries";
  public static final String REPEATED_ACCOUNT_BOOK_ENTRY = REPEATED_ACCOUNT_BOOK_ENTRIES
      + "/{repeatedAccountBookEntryId}";
}
