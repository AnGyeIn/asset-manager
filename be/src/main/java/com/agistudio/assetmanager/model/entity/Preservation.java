package com.agistudio.assetmanager.model.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.hibernate.annotations.DynamicInsert;

import com.agistudio.assetmanager.model.request.SavePreservationReq;
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
public class Preservation implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer preservationId;

  @NotNull
  @Positive
  private Integer amount;

  private String description;

  @NotNull
  @Builder.Default
  private Boolean active = true;

  public void update(SavePreservationReq savePreservationReq) {
    amount = savePreservationReq.getAmount();
    String description = savePreservationReq.getDescription();
    if (description != null) {
      this.description = description;
    }
    active = savePreservationReq.getActive();
  }
}
