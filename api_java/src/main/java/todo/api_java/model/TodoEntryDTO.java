package todo.api_java.model;


import todo.api_java.enums.TodoStatus;
import todo.api_java.enums.TodoType;

import java.sql.Date;

public class TodoEntryDTO {
    private String id;
    private String text;
    private TodoStatus status;
    private TodoType type;
    private Date creationDate;
    private Date lastChecked;
}
