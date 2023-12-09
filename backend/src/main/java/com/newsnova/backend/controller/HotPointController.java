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
@RestController
@RequestMapping("/newsnova")
public class HotPointController {
    @Autowired
    public NewsnovaService newsnovaService;

    @RequestMapping(value="/getHotPoint")//获取热榜数据
    public Result getHotPoint(@RequestParam(value="uid")String uid){//请求携带data：uid
        newsnovaService.addUser(uid);//如果user不存在，添加user
        JSONArray hotpoint = newsnovaService.callService(
                "http://106.52.237.153:8088/hotpoint", null,"0");//获取到热榜json数组
        return Result.success(hotpoint);
    }

}
