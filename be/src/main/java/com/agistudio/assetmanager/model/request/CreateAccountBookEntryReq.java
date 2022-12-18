package com.agistudio.assetmanager.model.request;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Schema(description = "request body to create account book entry.")
public class CreateAccountBookEntryReq extends YearAndMonthQuery {

  @Schema(description = "date.")
  @NotNull
  @Min(1)
  @Max(31)
  private Integer date;
}
