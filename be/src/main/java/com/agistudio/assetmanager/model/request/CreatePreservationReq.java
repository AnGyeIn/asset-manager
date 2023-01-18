package com.agistudio.assetmanager.model.request;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

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
  @Min(0)
  private Integer amount;

  @Schema(description = "description.")
  private String description;
}
