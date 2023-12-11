package com.newsnova.backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrowseRecord {
    private Integer id;
    private String uid;
    private String title;
    private String abstractText;
    private String url;
    private String engine;
    private boolean liked;
    private LocalDateTime browsedTime;
    private LocalDateTime likedTime;
}
