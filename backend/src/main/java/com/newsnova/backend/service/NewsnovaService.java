package com.newsnova.backend.service;

import com.alibaba.fastjson.JSONArray;
import com.newsnova.backend.pojo.SearchRecord;

public interface NewsnovaService {
    JSONArray callHotPointService(String url, String val1, String val2);
    void addHistorySearch(String uid, String keyword, String engine);
    SearchRecord[] getHistorySearch(String uid);
}
