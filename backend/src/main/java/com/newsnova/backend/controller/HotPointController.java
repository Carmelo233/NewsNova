package com.newsnova.backend.controller;

import com.alibaba.fastjson.JSONArray;
import com.newsnova.backend.pojo.Result;
import com.newsnova.backend.service.NewsnovaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@Slf4j
@RestController
@RequestMapping("/newsnova")
public class HotPointController {
    @Autowired
    public NewsnovaService newsnovaService;
    @Value("${arg.hot-point-url}")
    private String url;

    @RequestMapping(value="/get-hot-point")//获取热榜数据
    public Result getHotPoint(HttpSession session){//请求携带data：uid
        String sessionId = session.getId();
        if(sessionId==null){
            return Result.error("登录状态为空");
        }
        else {
            log.info("请求get-hot-point成功——1/3");
            String uid = session.getAttribute("uid").toString();
            log.info("sessionId:"+sessionId);
            newsnovaService.addUser(uid);//如果user不存在，添加user
            log.info("添加userid进数据库操作成功——2/3");
            JSONArray hotpoint = newsnovaService.callService(url, null, null);//获取到热榜json数组
            log.info("获取热榜成功——3/3");
            return Result.success(hotpoint);
        }
    }
}
