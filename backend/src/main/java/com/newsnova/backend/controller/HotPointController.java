package com.newsnova.backend.controller;

import com.alibaba.fastjson.JSONArray;
import com.newsnova.backend.pojo.Result;
import com.newsnova.backend.service.NewsnovaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/newsnova")
public class HotPointController {
    @Autowired
    public NewsnovaService newsnovaService;

    @RequestMapping(value="/getHotPoint")
    public Result getHotPoint(){
        JSONArray hotpoint = newsnovaService.callHotPointService(
                "http://106.52.237.153:8088/hotpoint", null,"0");
        return Result.success(hotpoint);
    }

}
