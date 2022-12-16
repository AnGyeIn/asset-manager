package com.agistudio.assetmanager.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.agistudio.assetmanager.repository.AccountBookEntryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountBookService {

  private final AccountBookEntryRepository accountBookEntryRepository;

  public Map<Integer, List<Integer>> getAccountBookEntriesYearsAndMonths() {
    log.info("getAccountBookEntriesYearsAndMonths");
    Map<Integer, List<Integer>> yearMonthListMap = new HashMap<>();
    accountBookEntryRepository.findAllYearAndMonth().forEach((tuple) -> {
      Integer year = (Integer) tuple.get(0);
      Integer month = (Integer) tuple.get(1);
      yearMonthListMap.computeIfAbsent(year, (_year) -> new LinkedList<>()).add(month);
    });
    return yearMonthListMap;
  }
}
