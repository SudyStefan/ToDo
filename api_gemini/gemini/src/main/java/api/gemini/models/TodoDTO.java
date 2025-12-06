package api.gemini.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class TodoDTO {
  private String id;

  private String text;
  private String status;
  private String type;
  private String creationDate;

  private String description;
  private String lastChecked;

  private Integer periodSeconds;
}
