package com.agistudio.assetmanager.model.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Schema(description = "request body to create preservation.")
public class CreatePreservationReq {

  @Schema(description = "amount.")
  @NotNull
  @Positive
  private Integer amount;

  @Schema(description = "description.")
  private String description;
}
