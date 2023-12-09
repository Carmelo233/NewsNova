package com.newsnova.backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRecord {
    private Integer id;
    private String uid;
    private String keyword;
}
