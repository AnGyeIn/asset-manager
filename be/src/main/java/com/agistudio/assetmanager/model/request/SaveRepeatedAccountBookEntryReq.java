package com.agistudio.assetmanager.model.request;

import java.time.DayOfWeek;

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
@Schema(description = "request body to save repeated account book entry.")
public class SaveRepeatedAccountBookEntryReq {

  @Schema(description = "repeating date.")
  @Min(1)
  @Max(31)
  private Integer date;

  @Schema(description = "repeating day of week.")
  private DayOfWeek dayOfWeek;

  @Schema(description = "amount of money.")
  private Integer amount;

  @Schema(description = "title of account book entry.")
  private String title;

  @Schema(description = "description of account book entry.")
  private String description;
}
