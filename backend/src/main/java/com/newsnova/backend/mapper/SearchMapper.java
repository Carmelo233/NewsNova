package com.newsnova.backend.mapper;

import com.alibaba.fastjson.JSONArray;
import com.newsnova.backend.pojo.SearchRecord;
import com.newsnova.backend.pojo.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface SearchMapper {

    @Insert("insert into history_search(uid, keyword, engine) " +
            "values (#{uid}, #{keyword}, #{engine})")
    void insertSearchRecord (SearchRecord searchRecord);

    @Select("select id, uid, keyword, engine from history_search where uid=#{uid}")
    SearchRecord[] selectHistorySearch(String uid);
}
