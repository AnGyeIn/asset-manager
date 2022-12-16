package com.agistudio.assetmanager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agistudio.assetmanager.constant.PathPattern;
import com.agistudio.assetmanager.constant.SwaggerTag;
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

  @Operation(summary = "get all years and months of account book entries", tags = SwaggerTag.ACCOUNT_BOOK)
  @GetMapping(path = PathPattern.ACCOUNT_BOOK_ENTRIES_YEARS_AND_MONTHS)
  public Map<Integer, List<Integer>> getAccountBookEntriesYearsAndMonths() {
    log.info("getAccountBookEntriesYearsAndMonths");
    return accountBookService.getAccountBookEntriesYearsAndMonths();
  }
}
