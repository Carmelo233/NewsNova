package com.newsnova.backend.controller;

import com.alibaba.fastjson.JSONArray;
import com.newsnova.backend.pojo.Result;
import com.newsnova.backend.service.NewsnovaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RequestMapping("/newsnova")
@RestController
public class SearchController {
    @Autowired
    public NewsnovaService newsnovaService;

    @RequestMapping("/search")//新闻搜索接口
    public Result search(
            @RequestParam(value= "uid") String uid,
            @RequestParam(value= "keyword") String keyword,
            @RequestParam(value= "engine") String engine) {
        newsnovaService.addHistorySearch(uid,keyword);//添加历史搜索记录
        JSONArray search_res = newsnovaService.callService("http://106.52.237.153:9090/search", keyword,engine);
        return Result.success(search_res);
    }

    @RequestMapping("/historySearch")
    public Result historySearch(@RequestParam(value= "uid") String uid){
        return Result.success(newsnovaService.getHistorySearch(uid));//
    }

    @RequestMapping("/browse")
    public Result browse(
        @RequestParam(value= "uid") String uid,
        @RequestParam(value= "id") Integer id,
        @RequestParam(value= "title") String title,
        @RequestParam(value= "abstractText") String abstractText,
        @RequestParam(value= "url") String url,
        @RequestParam(value= "engine") String engine){
        if(id==0) {
            Integer RecordId = newsnovaService.addHistoryBrowse(uid,title,abstractText,url,engine);
            return Result.success(RecordId);
        }
        else {
            newsnovaService.modifyLastBrowseTime(id);
            return Result.success();
        }
    }

    @RequestMapping("like")
    public Result like(@RequestParam(value= "id") Integer id){
        newsnovaService.setLiked(id);
        return Result.success();
    }
}
