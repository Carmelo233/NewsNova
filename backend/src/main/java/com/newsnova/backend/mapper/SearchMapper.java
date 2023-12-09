package com.newsnova.backend.mapper;
import com.newsnova.backend.pojo.BrowseRecord;
import com.newsnova.backend.pojo.SearchRecord;
import com.newsnova.backend.pojo.User;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface SearchMapper {

    void insertSearchRecord (SearchRecord searchRecord);
    List<SearchRecord> selectHistorySearch(User user);
    Integer selectByKeyword(SearchRecord searchRecord);
    void deleteSearchRecord(Integer id);
    void insertHistoryBrowse(BrowseRecord browseRecord);
    void updateBrowseTime(Integer id, LocalDateTime localtime);
    void modifyLiked(Integer id);
    void modifyLikedTime(Integer id,LocalDateTime localtime);
}
