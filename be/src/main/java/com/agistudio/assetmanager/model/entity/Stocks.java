package com.agistudio.assetmanager.model.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.DynamicInsert;

import com.agistudio.assetmanager.enums.StocksType;
import com.agistudio.assetmanager.model.request.SaveStocksReq;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIncludeProperties({
    "code", "stocksType", "floatingStocksNum", "floatingCostPerStocks", "stocksNum", "cost", "isBeingManaged" })
@DynamicInsert
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Stocks implements Serializable {

  @Id
  @NotBlank
  @Size(max = 100)
  private String code;

  @ManyToOne
  @JoinColumn(name = "stocks_account_id")
  @ToString.Exclude
  private StocksAccount stocksAccount;

  @NotNull
  private StocksType stocksType;

  @Min(0)
  @Builder.Default
  private Double floatingStocksNum = 0.0;

  @Min(0)
  @Builder.Default
  private Integer floatingCostPerStocks = 0;

  @Min(0)
  @Builder.Default
  private Integer stocksNum = 0;

  @Min(0)
  @Builder.Default
  private Integer cost = 0;

  @NotNull
  @Builder.Default
  private Boolean isBeingManaged = true;

  public void update(SaveStocksReq saveStocksReq) {
    Double floatingStocksNum = saveStocksReq.getFloatingStocksNum();
    Integer floatingCostPerStocks = saveStocksReq.getFloatingCostPerStocks();
    Integer stocksNum = saveStocksReq.getStocksNum();
    Integer cost = saveStocksReq.getCost();
    if (floatingStocksNum != null) {
      this.floatingStocksNum = floatingStocksNum;
    }
    if (floatingCostPerStocks != null) {
      this.floatingCostPerStocks = floatingCostPerStocks;
    }
    if (stocksNum != null) {
      this.stocksNum = stocksNum;
    }
    if (cost != null) {
      this.cost = cost;
    }
    isBeingManaged = saveStocksReq.getIsBeingManaged();
  }
}
