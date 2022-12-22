package com.agistudio.assetmanager.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.Tuple;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.agistudio.assetmanager.model.entity.AccountBookEntry;
import com.agistudio.assetmanager.model.entity.AccountBookEntry.AccountBookEntryBuilder;
import com.agistudio.assetmanager.model.request.CreateAccountBookEntryReq;
import com.agistudio.assetmanager.model.request.SaveAccountBookEntryReq;
import com.agistudio.assetmanager.model.request.YearAndMonthQuery;
import com.agistudio.assetmanager.model.response.TitlesAndDescriptions;
import com.agistudio.assetmanager.repository.AccountBookEntryRepository;
import com.agistudio.assetmanager.repository.RepeatedAccountBookEntryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountBookService {

  private final AccountBookEntryRepository accountBookEntryRepository;
  private final RepeatedAccountBookEntryRepository repeatedAccountBookEntryRepository;

  public Map<Integer, List<Integer>> getAccountBooksYearsAndMonths() {
    log.info("getAccountBooksYearsAndMonths");
    Map<Integer, List<Integer>> yearMonthListMap = new HashMap<>();
    accountBookEntryRepository.findAllYearAndMonth().forEach((tuple) -> {
      Integer year = (Integer) tuple.get(0);
      Integer month = (Integer) tuple.get(1);
      yearMonthListMap.computeIfAbsent(year, (_year) -> new LinkedList<>()).add(month);
    });
    return yearMonthListMap;
  }

  private void instantiateRepeatedAccountBookEntries(int year, int month) {
    log.info("instantiateRepeatedAccountBookEntries - year: {} / month: {}", year, month);
    List<AccountBookEntry> accountBookEntries = new LinkedList<>();
    repeatedAccountBookEntryRepository.findAll().forEach(repeatedAccountBookEntry -> {
      AccountBookEntryBuilder builder = AccountBookEntry.builder().year(year).month(month)
          .amount(repeatedAccountBookEntry.getAmount()).title(repeatedAccountBookEntry.getTitle())
          .description(repeatedAccountBookEntry.getDescription());
      Integer date = repeatedAccountBookEntry.getDate();
      if (date != null) {
        accountBookEntries.add(builder.date(date).build());
      } else {
        int dayOfWeek = repeatedAccountBookEntry.getDayOfWeek().getValue();
        LocalDate dayOfMonth = LocalDate.of(year, month, 1);
        int firstDay = dayOfMonth.getDayOfWeek().getValue();
        int daysOffset = (dayOfWeek - firstDay + 7) % 7;
        dayOfMonth = dayOfMonth.plusDays(daysOffset);
        while (dayOfMonth.getMonth().getValue() == month) {
          accountBookEntries.add(builder.date(dayOfMonth.getDayOfMonth()).build());
          dayOfMonth = dayOfMonth.plusDays(7);
        }
      }
    });
    if (!accountBookEntries.isEmpty()) {
      accountBookEntryRepository.saveAll(accountBookEntries);
    }
  }

  public Integer createAccountBook(YearAndMonthQuery yearAndMonthQuery) {
    log.info("createAccountBook");
    Integer year = yearAndMonthQuery.getYear();
    Integer month = yearAndMonthQuery.getMonth();
    if (accountBookEntryRepository.existsByYearAndMonth(year, month)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "account book of given year and month already exists.");
    }
    int prevYear = year;
    int prevMonth = month - 1;
    if (prevMonth == 0) {
      prevYear--;
      prevMonth = 12;
    }
    Integer initAmount = accountBookEntryRepository.getSumAmountByYearAndMonth(prevYear, prevMonth);
    AccountBookEntry initEntry = accountBookEntryRepository.save(AccountBookEntry.builder()
        .year(year)
        .month(month)
        .date(1)
        .amount(initAmount)
        .title("전월")
        .description("이월금")
        .build());

    instantiateRepeatedAccountBookEntries(year, month);

    return initEntry.getAccountBookEntryId();
  }

  public List<AccountBookEntry> getAccountBookEntries(YearAndMonthQuery yearAndMonthQuery) {
    log.info("getAccountBookEntries");
    return accountBookEntryRepository.findAllByYearAndMonthOrderByDateAscAccountBookEntryIdAsc(
        yearAndMonthQuery.getYear(),
        yearAndMonthQuery.getMonth());
  }

  public TitlesAndDescriptions getAccountBookEntrTitlesAndDescriptions() {
    log.info("getAccountBookEntriesTitlesAndDescriptions");
    TitlesAndDescriptions titlesAndDescriptions = TitlesAndDescriptions.builder().build();
    Set<String> titles = titlesAndDescriptions.getTitles();
    titles.addAll(accountBookEntryRepository.findAllTitle());
    titles.addAll(repeatedAccountBookEntryRepository.findAllTitles());
    Set<String> descriptions = titlesAndDescriptions.getDescriptions();
    descriptions.addAll(accountBookEntryRepository.findAllDescription());
    descriptions.addAll(repeatedAccountBookEntryRepository.findAllDescriptions());
    return titlesAndDescriptions;
  }

  public Integer createAccountBookEntry(CreateAccountBookEntryReq createAccountBookEntryReq) {
    log.info("createAccountBookEntry");
    return accountBookEntryRepository.save(AccountBookEntry.builder().year(createAccountBookEntryReq.getYear())
        .month(createAccountBookEntryReq.getMonth())
        .date(createAccountBookEntryReq.getDate())
        .build()).getAccountBookEntryId();
  }

  private void updateMonthInitialEntriesAfter(int year, int month) {
    log.info("updateMonthInitialEntriesAfter - year: {} / month: {}", year, month);
    List<Tuple> yearAndMonthAfter = accountBookEntryRepository.findAllYearAndMonthAfter(year, month);
    for (Tuple tuple : yearAndMonthAfter) {
      Integer nextYear = (Integer) tuple.get(0);
      Integer nextMonth = (Integer) tuple.get(1);
      Integer nextInitAmount = accountBookEntryRepository.getSumAmountByYearAndMonth(year, month);
      AccountBookEntry nextMonthInitialEntry = accountBookEntryRepository
          .findFirstByYearAndMonthOrderByAccountBookEntryId(nextYear, nextMonth).orElseThrow();
      boolean isAmountChanged = nextMonthInitialEntry.update(nextInitAmount);
      log.info("nextYear: {} / nextMonth: {} / nextInitAmount: {} / isAmountChanged: {}", nextYear, nextMonth,
          nextInitAmount, isAmountChanged);
      if (isAmountChanged) {
        accountBookEntryRepository.save(nextMonthInitialEntry);
        year = nextYear;
        month = nextMonth;
      } else {
        return;
      }
    }
  }

  public void updateAccountBookEntry(Integer accountBookEntryId, SaveAccountBookEntryReq saveAccountBookEntryReq) {
    log.info("updateAccountBookEntry");
    AccountBookEntry accountBookEntry = accountBookEntryRepository.findById(accountBookEntryId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
            "No account book entry exists with given id."));
    boolean isAmountChanged = accountBookEntry.update(saveAccountBookEntryReq);
    accountBookEntryRepository.save(accountBookEntry);
    if (isAmountChanged) {
      updateMonthInitialEntriesAfter(accountBookEntry.getYear(), accountBookEntry.getMonth());
    }
  }

  public void deleteAccountBookEntry(Integer accountBookEntryId) {
    log.info("deleteAccountBookEntry");
    AccountBookEntry accountBookEntry = accountBookEntryRepository.findById(accountBookEntryId).orElse(null);
    if (accountBookEntry != null) {
      accountBookEntryRepository.delete(accountBookEntry);
      if (accountBookEntry.getAmount() != 0) {
        updateMonthInitialEntriesAfter(accountBookEntry.getYear(), accountBookEntry.getMonth());
      }
    }
  }
}
