package com.agistudio.assetmanager.model.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.hibernate.annotations.DynamicInsert;

import com.agistudio.assetmanager.model.request.SaveStocksAccountReq;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@JsonInclude(JsonInclude.Include.NON_NULL)
@DynamicInsert
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StocksAccount implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer stocksAccountId;

  private String name;

  @NotNull
  @Positive
  private Integer cash;

  @NotNull
  @Positive
  @Max(100)
  private Double targetWeight;

  @OneToMany(orphanRemoval = true, mappedBy = "stocksAccount")
  @OrderBy("code ASC")
  private List<Stocks> stocksList;

  public void update(SaveStocksAccountReq saveStocksAccountReq) {
    String name = saveStocksAccountReq.getName();
    if (name != null) {
      this.name = name;
    }
    cash = saveStocksAccountReq.getCash();
    targetWeight = saveStocksAccountReq.getTargetWeight();
  }
}
