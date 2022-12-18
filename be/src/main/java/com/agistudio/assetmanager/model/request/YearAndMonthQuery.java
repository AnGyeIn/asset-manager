package com.agistudio.assetmanager.model.request;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
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
@Schema(description = "query condition of year and month.")
public class YearAndMonthQuery {

  @Schema(description = "year.")
  @NotNull
  @Positive
  private Integer year;

  @Schema(description = "month.")
  @NotNull
  @Min(1)
  @Max(12)
  private Integer month;
}
