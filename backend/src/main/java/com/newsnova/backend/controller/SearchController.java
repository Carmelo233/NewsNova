package com.newsnova.backend.controller;

import com.alibaba.fastjson.JSONArray;
import com.newsnova.backend.pojo.BrowseRecord;
import com.newsnova.backend.pojo.Result;
import com.newsnova.backend.pojo.SearchRecord;
import com.newsnova.backend.service.NewsnovaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;


@Slf4j
@RequestMapping("/newsnova")
@RestController
public class SearchController {
    @Autowired
    public NewsnovaService newsnovaService;
    @Value("${arg.search-url}")
    private String url;

    @RequestMapping("/search")//新闻搜索接口
    public Result search(
            HttpSession session,
            @RequestParam(value= "keyword") String keyword,
            @RequestParam(value= "engine") String engine) {
        String uid = session.getAttribute("uid").toString();
        newsnovaService.addHistorySearch(uid,keyword);//添加历史搜索记录
        JSONArray searchRes = newsnovaService.callService(url, keyword,engine);
        return Result.success(searchRes);//
    }

    @RequestMapping("/get-history-search")
    public Result historySearch(HttpSession session){
        String uid = session.getAttribute("uid").toString();
        return Result.success(newsnovaService.getHistorySearch(uid));//
    }

    @RequestMapping("/browse")
    public Result browse(HttpSession session,
            @RequestBody BrowseRecord browseRecord){
        if(browseRecord.getId()==0) {
            String uid = session.getAttribute("uid").toString();
            browseRecord.setUid(uid);
            Integer RecordId = newsnovaService.addHistoryBrowse(browseRecord);
            return Result.success(RecordId);
        }
        else {
            newsnovaService.modifyLastBrowseTime(browseRecord.getId());
            return Result.success();
        }
    }

    @RequestMapping("set-like")
    public Result like(@RequestParam(value= "id") Integer id){
        newsnovaService.setLiked(id);
        return Result.success();
    }

    @RequestMapping("/delete-all-record")
    public Result deleteAllRecord(HttpSession session){
        String uid = session.getAttribute("uid").toString();
        newsnovaService.deleteAll(uid);
        return Result.success();
    }

    @RequestMapping("/delete-search-record")
    public Result deleteSearchRecord(@RequestParam(value= "id") Integer id){
        newsnovaService.deleteHistory(id);
        return Result.success();
    }
}
