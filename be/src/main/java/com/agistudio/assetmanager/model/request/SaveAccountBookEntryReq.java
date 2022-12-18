package com.agistudio.assetmanager.model.request;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Schema(description = "request body to save account book entry.")
public class SaveAccountBookEntryReq {

  @Schema(description = "date.")
  @Min(1)
  @Max(31)
  private Integer date;

  @Schema(description = "amount of money.")
  private Integer amount;

  @Schema(description = "title of account book entry.")
  private String title;

  @Schema(description = "description of account book entry.")
  private String description;
}
