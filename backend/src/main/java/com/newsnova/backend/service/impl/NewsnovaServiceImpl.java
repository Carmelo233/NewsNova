package com.newsnova.backend.service.impl;
import com.alibaba.fastjson.JSONArray;
import com.newsnova.backend.mapper.SearchMapper;
import com.newsnova.backend.mapper.UserMapper;
import com.newsnova.backend.pojo.BrowseRecord;
import com.newsnova.backend.pojo.SearchRecord;
import com.newsnova.backend.pojo.User;
import com.newsnova.backend.service.NewsnovaService;
import com.newsnova.backend.config.RestTemplateConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class NewsnovaServiceImpl implements NewsnovaService {
    @Autowired
    public RestTemplateConfig restTemplateConfig;
    @Autowired
    public SearchMapper searchMapper;
    @Autowired
    public UserMapper userMapper;

    @Override
    public JSONArray callService(String url, String val1, String val2){
        return restTemplateConfig.sendPost(url,val1,val2);
    }
    @Override
    public void addHistorySearch(String uid, String keyword){
        SearchRecord searchRecord = new SearchRecord();
        searchRecord.setUid(uid);
        searchRecord.setKeyword(keyword);
        if(searchMapper.selectByKeyword(searchRecord) != null)
        {
            Integer pre_id = searchMapper.selectByKeyword(searchRecord);
            searchMapper.deleteSearchRecord(pre_id);
        }
        searchMapper.insertSearchRecord(searchRecord);
    }

    @Override
    public List<SearchRecord> getHistorySearch(String uid){
        User user = new User();
        user.setUid(uid);
        List<SearchRecord> res = searchMapper.selectHistorySearch(user);
        int l = res.size();
        if(l>10){
            SearchRecord firstRecord = res.get(l-1);
            Integer firstId = firstRecord.getId();
            //System.out.println(firstId);
            searchMapper.deleteOverdueRecord(firstId,uid);
        }
        return res;
    }

    @Override
    public void addUser(String uid){
        User user = new User();
        user.setUid(uid);
        if(userMapper.selectUser(user) == null){
            userMapper.insertUser(user);
        }
    }

    @Override
    public Integer addHistoryBrowse(BrowseRecord browseRecord){
        browseRecord.setBrowsedTime(LocalDateTime.now());
        searchMapper.insertHistoryBrowse(browseRecord);
        return browseRecord.getId();
    }

    @Override
    public void modifyLastBrowseTime(Integer id){
        LocalDateTime localtime = LocalDateTime.now();
        searchMapper.updateBrowseTime(id,localtime);
    }

    @Override
    public void setLiked(Integer id){
        LocalDateTime localtime = LocalDateTime.now();
        searchMapper.modifyLiked(id);
        searchMapper.modifyLikedTime(id,localtime);
    }

    @Override
    public List<BrowseRecord> getHistoryBrowse(String uid){
        User user = new User();
        user.setUid(uid);
        return userMapper.selectHistoryBrowse(user);
    }

    @Override
    public List<BrowseRecord> getLikedList(String uid){
        User user = new User();
        user.setUid(uid);
        return userMapper.selectLikedList(user);
    }

    public void deleteAll(String uid){
        User user = new User();
        user.setUid(uid);
        searchMapper.deleteAllHistorySearch(user);
    }

    public void deleteHistory(Integer id){
        searchMapper.deleteSearchRecord(id);
    }
}
