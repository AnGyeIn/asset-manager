package com.agistudio.assetmanager.model.entity;

import java.io.Serializable;
import java.time.DayOfWeek;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Positive;

import org.hibernate.annotations.DynamicInsert;
import org.springframework.util.StringUtils;

import com.agistudio.assetmanager.model.request.SaveRepeatedAccountBookEntryReq;
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
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RepeatedAccountBookEntry implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer repeatedAccountBookEntryId;

  @Positive
  private Integer date;

  private DayOfWeek dayOfWeek;

  private Integer amount;

  private String title;

  private String description;

  public void update(SaveRepeatedAccountBookEntryReq saveRepeatedAccountBookEntryReq) {
    Integer date = saveRepeatedAccountBookEntryReq.getDate();
    DayOfWeek dayOfWeek = saveRepeatedAccountBookEntryReq.getDayOfWeek();
    String title = saveRepeatedAccountBookEntryReq.getTitle();
    String description = saveRepeatedAccountBookEntryReq.getDescription();
    if (date != null) {
      this.date = date;
    } else if (dayOfWeek != null) {
      this.dayOfWeek = dayOfWeek;
    }
    if (StringUtils.hasText(title)) {
      this.title = title;
    }
    if (StringUtils.hasText(description)) {
      this.description = description;
    }
  }
}