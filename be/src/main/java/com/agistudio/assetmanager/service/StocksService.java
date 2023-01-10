package com.agistudio.assetmanager.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.agistudio.assetmanager.model.entity.Preservation;
import com.agistudio.assetmanager.model.entity.Stocks;
import com.agistudio.assetmanager.model.entity.StocksAccount;
import com.agistudio.assetmanager.model.request.CreatePreservationReq;
import com.agistudio.assetmanager.model.request.CreateStocksReq;
import com.agistudio.assetmanager.model.request.SavePreservationReq;
import com.agistudio.assetmanager.model.request.SaveStocksAccountReq;
import com.agistudio.assetmanager.model.request.SaveStocksReq;
import com.agistudio.assetmanager.repository.PreservationRepository;
import com.agistudio.assetmanager.repository.StocksAccountRepository;
import com.agistudio.assetmanager.repository.StocksRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class StocksService {

  private final PreservationRepository preservationRepository;
  private final StocksAccountRepository stocksAccountRepository;
  private final StocksRepository stocksRepository;

  public List<Preservation> getPreservations() {
    log.info("getPreservations");
    return preservationRepository.findAll(Sort.by("preservationId").ascending());
  }

  public Integer createPreservation(CreatePreservationReq createPreservationReq) {
    log.info("createPreservation");
    return preservationRepository.save(Preservation.builder()
        .amount(createPreservationReq.getAmount())
        .description(createPreservationReq.getDescription())
        .build()).getPreservationId();
  }

  public void updatePreservation(Integer preservationId, SavePreservationReq savePreservationReq) {
    log.info("updatePreservation");
    Preservation preservation = preservationRepository.findById(preservationId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No preservation exists with given id."));
    preservation.update(savePreservationReq);
    preservationRepository.save(preservation);
  }

  public void deletePreservation(Integer preservationId) {
    log.info("deletePreservation");
    preservationRepository.deleteById(preservationId);
  }

  public List<StocksAccount> getStocksAccounts() {
    log.info("getStocksAccounts");
    return stocksAccountRepository.findAll(Sort.by("stocksAccountId").ascending());
  }

  public Integer createStocksAccount(SaveStocksAccountReq saveStocksAccountReq) {
    log.info("createStocksAccount");
    return stocksAccountRepository.save(StocksAccount.builder()
        .name(saveStocksAccountReq.getName())
        .cash(0)
        .targetWeight(saveStocksAccountReq.getTargetWeight())
        .build()).getStocksAccountId();
  }

  public void updateStocksAccount(Integer stocksAccountId, SaveStocksAccountReq saveStocksAccountReq) {
    log.info("updateStocksAccount");
    StocksAccount stocksAccount = stocksAccountRepository.findById(stocksAccountId).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No stocks account exists with given id."));
    stocksAccount.update(saveStocksAccountReq);
    stocksAccountRepository.save(stocksAccount);
  }

  public void deleteStocksAccount(Integer stocksAccountId) {
    log.info("deleteStocksAccount");
    stocksAccountRepository.deleteById(stocksAccountId);
  }

  public String createStocks(CreateStocksReq createStocksReq) {
    log.info("createStocks");
    if (stocksRepository.existsById(createStocksReq.getCode())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Stocks with given code already exists.");
    }

    StocksAccount stocksAccount = stocksAccountRepository.findById(createStocksReq.getStocksAccountId()).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No stocks account exists with given id."));

    return stocksRepository.save(Stocks.builder()
        .code(createStocksReq.getCode())
        .stocksAccount(stocksAccount)
        .stocksType(createStocksReq.getStocksType())
        .build()).getCode();
  }

  public void updateStocks(String code, SaveStocksReq saveStocksReq) {
    log.info("updateStocks");
    Stocks stocks = stocksRepository.findById(code)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No stocks exists with given code."));
    stocks.update(saveStocksReq);
    stocksRepository.save(stocks);
  }

  public void deleteStocks(String code) {
    log.info("deleteStocks");
    stocksRepository.deleteById(code);
  }
}
