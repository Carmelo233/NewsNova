package com.newsnova.backend.mapper;

import com.newsnova.backend.pojo.BrowseRecord;
import com.newsnova.backend.pojo.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    void insertUser(User user);
    User selectUser(User user);
    List<BrowseRecord> selectHistoryBrowse(User user);
    List<BrowseRecord> selectLikedList(User user);
}
