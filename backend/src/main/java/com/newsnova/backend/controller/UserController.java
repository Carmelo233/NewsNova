package com.newsnova.backend.controller;

import com.newsnova.backend.pojo.Result;
import com.newsnova.backend.service.NewsnovaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/newsnova")
public class UserController {
    @Autowired
    NewsnovaService newsnovaService;

    @RequestMapping("/get-history-browse")
    public Result historyBrowse(@RequestParam(value="uid") String uid){
        return Result.success(newsnovaService.getHistoryBrowse(uid));
    }

    @RequestMapping("/get-liked-list")
    public Result likedList(@RequestParam(value="uid") String uid){
        return Result.success(newsnovaService.getLikedList(uid));
    }
}
