package com.agistudio.assetmanager.model.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.agistudio.assetmanager.model.request.SaveAccountBookEntryReq;
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
public class AccountBookEntry implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer accountBookEntryId;

  @NotNull
  @Positive
  private Integer year;

  @NotNull
  @Positive
  private Integer month;

  @NotNull
  @Positive
  private Integer date;

  @NotNull
  @ColumnDefault(value = "0")
  @Builder.Default
  private Integer amount = 0;

  private String title;

  private String description;

  public boolean update(SaveAccountBookEntryReq saveAccountBookEntryReq) {
    boolean isAmountChanged = false;
    Integer date = saveAccountBookEntryReq.getDate();
    Integer amount = saveAccountBookEntryReq.getAmount();
    String title = saveAccountBookEntryReq.getTitle();
    String description = saveAccountBookEntryReq.getDescription();
    if (date != null) {
      this.date = date;
    }
    if (amount != null) {
      isAmountChanged = this.amount != amount;
      this.amount = amount;
    }
    if (title != null) {
      this.title = title;
    }
    if (description != null) {
      this.description = description;
    }
    return isAmountChanged;
  }

  public boolean update(Integer amount) {
    return update(SaveAccountBookEntryReq.builder().amount(amount).build());
  }
}
