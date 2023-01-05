package com.agistudio.assetmanager.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.agistudio.assetmanager.constant.PathPattern;
import com.agistudio.assetmanager.constant.SwaggerTag;
import com.agistudio.assetmanager.model.entity.AccountBookEntry;
import com.agistudio.assetmanager.model.entity.RepeatedAccountBookEntry;
import com.agistudio.assetmanager.model.request.CreateAccountBookEntryReq;
import com.agistudio.assetmanager.model.request.SaveAccountBookEntryReq;
import com.agistudio.assetmanager.model.request.SaveRepeatedAccountBookEntryReq;
import com.agistudio.assetmanager.model.request.YearAndMonthQuery;
import com.agistudio.assetmanager.model.response.TitlesAndDescriptions;
import com.agistudio.assetmanager.service.AccountBookService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Tag(name = SwaggerTag.ACCOUNT_BOOK, description = "account book")
@RestController
@RequiredArgsConstructor
public class AccountBookController {

  private final AccountBookService accountBookService;

  @Operation(summary = "get all years and months of account books", tags = SwaggerTag.ACCOUNT_BOOK)
  @GetMapping(path = PathPattern.ACCOUNT_BOOKS_YEARS_AND_MONTHS)
  public Map<Integer, List<Integer>> getAccountBooksYearsAndMonths() {
    log.info("getAccountBooksYearsAndMonths");
    return accountBookService.getAccountBooksYearsAndMonths();
  }

  @Operation(summary = "create account book for specific year and month", tags = SwaggerTag.ACCOUNT_BOOK)
  @PostMapping(path = PathPattern.ACCOUNT_BOOK)
  public Integer createAccountBook(@RequestBody @Valid YearAndMonthQuery yearAndMonthQuery) {
    log.info("createAccountBook: {}", yearAndMonthQuery);
    return accountBookService.createAccountBook(yearAndMonthQuery);
  }

  @Operation(summary = "get account book entries of specific year and month", tags = SwaggerTag.ACCOUNT_BOOK)
  @GetMapping(path = PathPattern.ACCOUNT_BOOK_ENTRIES)
  public List<AccountBookEntry> getAccountBookEntries(@Valid YearAndMonthQuery yearAndMonthQuery) {
    log.info("getAccountBookEntries: {}", yearAndMonthQuery);
    return accountBookService.getAccountBookEntries(yearAndMonthQuery);
  }

  @Operation(summary = "get list of all the titles and descriptions of account book entries", tags = SwaggerTag.ACCOUNT_BOOK)
  @GetMapping(path = PathPattern.ACCOUNT_BOOK_ENTRIES_TITLES_AND_DESCRIPTIONS)
  public TitlesAndDescriptions getAccountBookEntriesTitlesAndDescriptions() {
    log.info("getAccountBookEntriesTitlesAndDescriptions");
    return accountBookService.getAccountBookEntrTitlesAndDescriptions();
  }

  @Operation(summary = "create account book entry", tags = SwaggerTag.ACCOUNT_BOOK)
  @PostMapping(path = PathPattern.ACCOUNT_BOOK_ENTRY_UNKNOWN)
  public Integer creatAccountBookEntry(@RequestBody @Valid CreateAccountBookEntryReq createAccountBookEntryReq) {
    log.info("createAccountBookEntry: {}", createAccountBookEntryReq);
    return accountBookService.createAccountBookEntry(createAccountBookEntryReq);
  }

  @Operation(summary = "update account book entry", tags = SwaggerTag.ACCOUNT_BOOK)
  @PatchMapping(path = PathPattern.ACCOUNT_BOOK_ENTRY)
  public void updateAccountBookEntry(@PathVariable Integer accountBookEntryId,
      @RequestBody @Valid SaveAccountBookEntryReq saveAccountBookEntryReq) {
    log.info("updateAccountBookEntry - accountBookEntryId: {} / saveAccountBookEntryReq: {}", accountBookEntryId,
        saveAccountBookEntryReq);
    accountBookService.updateAccountBookEntry(accountBookEntryId, saveAccountBookEntryReq);
  }

  @Operation(summary = "delete account book entry", tags = SwaggerTag.ACCOUNT_BOOK)
  @DeleteMapping(path = PathPattern.ACCOUNT_BOOK_ENTRY)
  public void deleteAccountBookEntry(@PathVariable Integer accountBookEntryId) {
    log.info("delete account book entry - accountBookEntryId: {}", accountBookEntryId);
    accountBookService.deleteAccountBookEntry(accountBookEntryId);
  }

  @Operation(summary = "get list of repeated account book entries", tags = SwaggerTag.ACCOUNT_BOOK)
  @GetMapping(path = PathPattern.REPEATED_ACCOUNT_BOOK_ENTRIES)
  public List<RepeatedAccountBookEntry> getRepeatedAccountBookEntries() {
    log.info("getRepeatedAccountBookEntries");
    return accountBookService.getRepeatedAccountBookEntries();
  }

  @Operation(summary = "create repeated account book entry", tags = SwaggerTag.ACCOUNT_BOOK)
  @PostMapping(path = PathPattern.REPEATED_ACCOUNT_BOOK_ENTRY_UNKNOWN)
  public Integer createRepeatedAccountBookEntry(
      @RequestBody @Valid SaveRepeatedAccountBookEntryReq saveRepeatedAccountBookEntryReq) {
    log.info("createRepeatedAccountBookEntry: {}", saveRepeatedAccountBookEntryReq);
    return accountBookService.createRepeatedAccountBookEntry(saveRepeatedAccountBookEntryReq);
  }

  @Operation(summary = "update repeated account book entry", tags = SwaggerTag.ACCOUNT_BOOK)
  @PatchMapping(path = PathPattern.REPEATED_ACCOUNT_BOOK_ENTRY)
  public void updateRepeatedAccountBookEntry(@PathVariable Integer repeatedAccountBookEntryId,
      @RequestBody @Valid SaveRepeatedAccountBookEntryReq saveRepeatedAccountBookEntryReq) {
    log.info("updateRepeatedAccountBookEntry - repeatedAccountBookEntryId: {} / saveRepeatedAccountBookEntryReq: {}",
        repeatedAccountBookEntryId, saveRepeatedAccountBookEntryReq);
    accountBookService.updateRepeatedAccountBookEntry(repeatedAccountBookEntryId,
        saveRepeatedAccountBookEntryReq);
  }

  @Operation(summary = "delete repeated account book entry", tags = SwaggerTag.ACCOUNT_BOOK)
  @DeleteMapping(path = PathPattern.REPEATED_ACCOUNT_BOOK_ENTRY)
  public void deleteRepeatedAccountBookEntry(@PathVariable Integer repeatedAccountBookEntryId) {
    log.info("deleteRepeatedAccountBookEntry - repeatedAccountBookEntryId: {}", repeatedAccountBookEntryId);
    accountBookService.deleteRepeatedAccountBookEntry(repeatedAccountBookEntryId);
  }
}
