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

    @RequestMapping("/search")
    public Result search(
            @RequestParam(value= "uid") String uid,
            @RequestParam(value= "keyword") String keyword,
            @RequestParam(value= "engine") String engine) {
        newsnovaService.addHistorySearch(uid,keyword,engine);
        JSONArray search_res = newsnovaService.callHotPointService("http://106.52.237.153:9090/search", keyword,engine);
        return Result.success(search_res);
    }

    @RequestMapping("/historySearch")
    public Result search(@RequestParam(value= "uid") String uid){
        return Result.success(newsnovaService.getHistorySearch(uid));
    }

    @RequestMapping("/historyBrowse")
    public Result browse(
        @RequestParam(value= "uid") String uid,
        @RequestParam(value= "text") String text,
        @RequestParam(value= "url") String url,
        @RequestParam(value= "engine") String engine){
        return Result.success();
    }
}
