package com.newsnova.backend.service;

import com.alibaba.fastjson.JSONArray;
import com.newsnova.backend.pojo.BrowseRecord;
import com.newsnova.backend.pojo.SearchRecord;

import java.util.List;

public interface NewsnovaService {
    JSONArray callService(String url, String val1, String val2);
    void addHistorySearch(String uid, String keyword);
    List<SearchRecord> getHistorySearch(String uid);
    void addUser(String uid);
    Integer addHistoryBrowse(String uid,String title,String abstractText,String url,String engine);
    void modifyLastBrowseTime(Integer id);
    void setLiked(Integer id);
    List<BrowseRecord> getHistoryBrowse(String uid);
    List<BrowseRecord> getLikedList(String uid);
}
