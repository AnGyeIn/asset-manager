package com.agistudio.assetmanager.controller;

import java.util.List;

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
import com.agistudio.assetmanager.model.entity.RepeatedAccountBookEntry;
import com.agistudio.assetmanager.model.request.SaveRepeatedAccountBookEntryReq;
import com.agistudio.assetmanager.service.RepeatedAccountBookEntryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Tag(name = SwaggerTag.REPEATED_ACCOUNT_BOOK_ENTRY, description = "repeated account book entry")
@RestController
@RequiredArgsConstructor
public class RepeatedAccountBookEntryController {

  private final RepeatedAccountBookEntryService repeatedAccountBookEntryService;

  @Operation(summary = "get list of repeated account book entries", tags = SwaggerTag.REPEATED_ACCOUNT_BOOK_ENTRY)
  @GetMapping(path = PathPattern.REPEATED_ACCOUNT_BOOK_ENTRIES)
  public List<RepeatedAccountBookEntry> getRepeatedAccountBookEntries() {
    log.info("getRepeatedAccountBookEntries");
    return repeatedAccountBookEntryService.getRepeatedAccountBookEntries();
  }

  @Operation(summary = "create repeated account book entry", tags = SwaggerTag.REPEATED_ACCOUNT_BOOK_ENTRY)
  @PostMapping(path = PathPattern.REPEATED_ACCOUNT_BOOK_ENTRY_UNKNOWN)
  public Integer createRepeatedAccountBookEntry(
      @RequestBody @Valid SaveRepeatedAccountBookEntryReq saveRepeatedAccountBookEntryReq) {
    log.info("createRepeatedAccountBookEntry: {}", saveRepeatedAccountBookEntryReq);
    return repeatedAccountBookEntryService.createRepeatedAccountBookEntry(saveRepeatedAccountBookEntryReq);
  }

  @Operation(summary = "update repeated account book entry", tags = SwaggerTag.REPEATED_ACCOUNT_BOOK_ENTRY)
  @PatchMapping(path = PathPattern.REPEATED_ACCOUNT_BOOK_ENTRY)
  public void updateRepeatedAccountBookEntry(@PathVariable Integer repeatedAccountBookEntryId,
      @RequestBody @Valid SaveRepeatedAccountBookEntryReq saveRepeatedAccountBookEntryReq) {
    log.info("updateRepeatedAccountBookEntry - repeatedAccountBookEntryId: {} / saveRepeatedAccountBookEntryReq: {}",
        repeatedAccountBookEntryId, saveRepeatedAccountBookEntryReq);
    repeatedAccountBookEntryService.updateRepeatedAccountBookEntry(repeatedAccountBookEntryId,
        saveRepeatedAccountBookEntryReq);
  }

  @Operation(summary = "delete repeated account book entry", tags = SwaggerTag.REPEATED_ACCOUNT_BOOK_ENTRY)
  @DeleteMapping(path = PathPattern.REPEATED_ACCOUNT_BOOK_ENTRY)
  public void deleteRepeatedAccountBookEntry(@PathVariable Integer repeatedAccountBookEntryId) {
    log.info("deleteRepeatedAccountBookEntry - repeatedAccountBookEntryId: {}", repeatedAccountBookEntryId);
    repeatedAccountBookEntryService.deleteRepeatedAccountBookEntry(repeatedAccountBookEntryId);
  }
}
