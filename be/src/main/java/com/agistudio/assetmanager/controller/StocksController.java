package com.agistudio.assetmanager.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Size;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.agistudio.assetmanager.constant.PathPattern;
import com.agistudio.assetmanager.constant.SwaggerTag;
import com.agistudio.assetmanager.model.entity.Preservation;
import com.agistudio.assetmanager.model.entity.StocksAccount;
import com.agistudio.assetmanager.model.request.CreatePreservationReq;
import com.agistudio.assetmanager.model.request.CreateStocksReq;
import com.agistudio.assetmanager.model.request.SavePreservationReq;
import com.agistudio.assetmanager.model.request.SaveStocksAccountReq;
import com.agistudio.assetmanager.model.request.SaveStocksReq;
import com.agistudio.assetmanager.service.StocksService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Tag(name = SwaggerTag.STOCKS, description = "stocks")
@RestController
@RequiredArgsConstructor
public class StocksController {

  private final StocksService stocksService;

  @Operation(summary = "get list of preservations", tags = SwaggerTag.STOCKS)
  @GetMapping(path = PathPattern.PRESERVATIONS)
  public List<Preservation> getPreservations() {
    log.info("getPreservations");
    return stocksService.getPreservations();
  }

  @Operation(summary = "create preservation", tags = SwaggerTag.STOCKS)
  @PostMapping(path = PathPattern.PRESERVATION_UNKNOWN)
  public Integer createPreservation(@RequestBody @Valid CreatePreservationReq createPreservationReq) {
    log.info("createPreservation: {}", createPreservationReq);
    return stocksService.createPreservation(createPreservationReq);
  }

  @Operation(summary = "update preservation", tags = SwaggerTag.STOCKS)
  @PatchMapping(path = PathPattern.PRESERVATION)
  public void updatePreservation(@PathVariable Integer preservationId,
      @RequestBody @Valid SavePreservationReq savePreservationReq) {
    log.info("updatePreservation - preservationId: {} / savePreservationReq: {}", preservationId, savePreservationReq);
    stocksService.updatePreservation(preservationId, savePreservationReq);
  }

  @Operation(summary = "delete preservation", tags = SwaggerTag.STOCKS)
  @DeleteMapping(path = PathPattern.PRESERVATION)
  public void deletePreservation(@PathVariable Integer preservationId) {
    log.info("deletePreservation - preservationId: {}", preservationId);
    stocksService.deletePreservation(preservationId);
  }

  @Operation(summary = "get list of stocks accounts", tags = SwaggerTag.STOCKS)
  @GetMapping(path = PathPattern.STOCKS_ACCOUNTS)
  public List<StocksAccount> getStocksAccounts() {
    log.info("getStocksAccounts");
    return stocksService.getStocksAccounts();
  }

  @Operation(summary = "create stocks account", tags = SwaggerTag.STOCKS)
  @PostMapping(path = PathPattern.STOCKS_ACCOUNT_UNKNOWN)
  public Integer createStocksAccount(@RequestBody @Valid SaveStocksAccountReq saveStocksAccountReq) {
    log.info("createStocksAccount: {}", saveStocksAccountReq);
    return stocksService.createStocksAccount(saveStocksAccountReq);
  }

  @Operation(summary = "update stocks account", tags = SwaggerTag.STOCKS)
  @PatchMapping(path = PathPattern.STOCKS_ACCOUNT)
  public void updateStocksAccount(@PathVariable Integer stocksAccountId,
      @RequestBody @Valid SaveStocksAccountReq saveStocksAccountReq) {
    log.info("updateStocksAccount - stocksAccountId: {} / saveStocksAccountReq: {}", stocksAccountId,
        saveStocksAccountReq);
    stocksService.updateStocksAccount(stocksAccountId, saveStocksAccountReq);
  }

  @Operation(summary = "delete stocks account", tags = SwaggerTag.STOCKS)
  @DeleteMapping(path = PathPattern.STOCKS_ACCOUNT)
  public void deleteStocksAccount(@PathVariable Integer stocksAccountId) {
    log.info("deleteStocksAccount - stocksACcountId: {}", stocksAccountId);
    stocksService.deleteStocksAccount(stocksAccountId);
  }

  @Operation(summary = "create stocks", tags = SwaggerTag.STOCKS)
  @PostMapping(path = PathPattern.STOCKS_UNKNOWN)
  public String createStocks(@RequestBody @Valid CreateStocksReq createStocksReq) {
    log.info("createStocks: {}", createStocksReq);
    return stocksService.createStocks(createStocksReq);
  }

  @Operation(summary = "update stocks", tags = SwaggerTag.STOCKS)
  @PatchMapping(path = PathPattern.STOCKS)
  public void updateStocks(@PathVariable @Size(max = 100) String code,
      @RequestBody @Valid SaveStocksReq saveStocksReq) {
    log.info("updateStocks - code: {} / saveStocksReq: {}", code, saveStocksReq);
    stocksService.updateStocks(code, saveStocksReq);
  }

  @Operation(summary = "delete stocks", tags = SwaggerTag.STOCKS)
  @DeleteMapping(path = PathPattern.STOCKS)
  public void deleteStocks(@PathVariable @Size(max = 100) String code) {
    log.info("deleteStocks - code: {}", code);
    stocksService.deleteStocks(code);
  }
}
