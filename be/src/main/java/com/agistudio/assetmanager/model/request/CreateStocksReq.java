package com.agistudio.assetmanager.model.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.agistudio.assetmanager.enums.StocksType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Schema(description = "request body to create stocks.")
public class CreateStocksReq {
  
  @Schema(description = "stocks code.")
  @NotBlank
  @Size(max = 100)
  private String code;

  @Schema(description = "stoks account id.")
  @NotNull
  private Integer stocksAccountId;

  @Schema(description = "stocks type.")
  @NotNull
  private StocksType stocksType;
}
