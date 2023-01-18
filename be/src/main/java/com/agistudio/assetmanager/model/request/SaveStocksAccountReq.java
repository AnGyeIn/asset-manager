package com.agistudio.assetmanager.model.request;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Schema(description = "request body to save stocks account.")
public class SaveStocksAccountReq {

  @Schema(description = "name.")
  private String name;

  @Schema(description = "cash.")
  @Min(0)
  private Integer cash;

  @Schema(description = "target weight in percent.")
  @Min(0)
  @Max(100)
  private Double targetWeight;
}
