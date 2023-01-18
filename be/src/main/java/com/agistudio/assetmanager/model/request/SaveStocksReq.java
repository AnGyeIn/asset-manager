package com.agistudio.assetmanager.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Schema(description = "request body to save stocks.")
public class SaveStocksReq {
  
  @Schema(description = "number of floating point stocks.")
  private Double floatingStocksNum;

  @Schema(description = "cost per floating point stocks.")
  private Integer floatingCostPerStocks;

  @Schema(description = "number of stocks.")
  private Integer StocksNum;

  @Schema(description = "cost.")
  private Integer cost;

  @Schema(description = "is being managed flag.")
  private Boolean isBeingManaged;
}
