package com.newsnova.backend.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.newsnova.backend.mapper.SearchMapper;
import com.newsnova.backend.mapper.UserMapper;
import com.newsnova.backend.pojo.SearchRecord;
import com.newsnova.backend.service.NewsnovaService;
import com.newsnova.backend.utils.RestTemplateConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsnovaServiceImpl implements NewsnovaService {
    @Autowired
    public RestTemplateConfig restTemplateConfig;
    @Autowired
    public SearchMapper searchMapper;
//    @Autowired
//    public UserMapper userMapper;

    @Override
    public JSONArray callHotPointService(String url, String val1, String val2){
        return restTemplateConfig.sendPost(url,val1,val2);
    }
    @Override
    public void addHistorySearch(String uid, String keyword, String engine){
        SearchRecord searchRecord = new SearchRecord();
        //id先不设置默认自增（后续要改再看）
        searchRecord.setUid(uid);
        searchRecord.setKeyword(keyword);
        searchRecord.setEngine(engine);
        searchMapper.insertSearchRecord(searchRecord);
    }

    @Override
    public SearchRecord[] getHistorySearch(String uid){
        return searchMapper.selectHistorySearch(uid);
    }
}
