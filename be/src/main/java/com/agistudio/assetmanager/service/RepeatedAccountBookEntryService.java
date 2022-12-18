package com.agistudio.assetmanager.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.agistudio.assetmanager.model.entity.RepeatedAccountBookEntry;
import com.agistudio.assetmanager.model.request.SaveRepeatedAccountBookEntryReq;
import com.agistudio.assetmanager.repository.RepeatedAccountBookEntryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RepeatedAccountBookEntryService {

  private final RepeatedAccountBookEntryRepository repeatedAccountBookEntryRepository;

  public List<RepeatedAccountBookEntry> getRepeatedAccountBookEntries() {
    log.info("getRepeatedAccountBookEntries");
    return repeatedAccountBookEntryRepository.findAll(Sort.by("repeatedAccountBookEntryId").ascending());
  }

  public Integer createRepeatedAccountBookEntry(SaveRepeatedAccountBookEntryReq saveRepeatedAccountBookEntryReq) {
    log.info("createRepeatedAccountBookEntry");
    return repeatedAccountBookEntryRepository.save(RepeatedAccountBookEntry.builder()
        .date(saveRepeatedAccountBookEntryReq.getDate())
        .dayOfWeek(saveRepeatedAccountBookEntryReq.getDayOfWeek())
        .amount(saveRepeatedAccountBookEntryReq.getAmount())
        .title(saveRepeatedAccountBookEntryReq.getTitle())
        .description(saveRepeatedAccountBookEntryReq.getDescription())
        .build())
        .getRepeatedAccountBookEntryId();
  }

  public void updateRepeatedAccountBookEntry(Integer repeatedAccountBookEntryId,
      SaveRepeatedAccountBookEntryReq saveRepeatedAccountBookEntryReq) {
    log.info("updateRepeatedAccountBookEntry");
    RepeatedAccountBookEntry repeatedAccountBookEntry = repeatedAccountBookEntryRepository
        .findById(repeatedAccountBookEntryId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
            "No repeated account book entry exists with given id."));
    repeatedAccountBookEntry.update(saveRepeatedAccountBookEntryReq);
    repeatedAccountBookEntryRepository.save(repeatedAccountBookEntry);
  }

  public void deleteRepeatedAccountBookEntry(Integer repeatedAccountBookEntryId) {
    log.info("deleteRepeatedAccountBookEntry");
    repeatedAccountBookEntryRepository.deleteById(repeatedAccountBookEntryId);
  }
}
