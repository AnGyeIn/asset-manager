package com.agistudio.assetmanager.model.request;

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
@Schema(description = "request body to save preservation.")
public class SavePreservationReq extends CreatePreservationReq {
  
  @Schema(description = "active flag.")
  private Boolean active;
}
