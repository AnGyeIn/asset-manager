package com.agistudio.assetmanager.model.response;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Schema(description = "list of titles and descriptions.")
public class TitlesAndDescriptions {

  @Builder.Default
  private Set<String> titles = new HashSet<String>();

  @Builder.Default
  private Set<String> descriptions = new HashSet<String>();
}
