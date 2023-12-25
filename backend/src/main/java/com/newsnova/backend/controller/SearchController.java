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
        log.info("请求search成功");
        String sessionId = session.getId();
        if(sessionId==null){
            return Result.error("登录状态为空");
        }
        else {
            String uid = session.getAttribute("uid").toString();
            newsnovaService.addHistorySearch(uid, keyword);//添加历史搜索记录
            log.info("添加历史搜索记录进数据库操作成功——1/2");
            JSONArray searchRes = newsnovaService.callService(url, keyword, engine);
            log.info("搜索算法调用成功——2/2");
            return Result.success(searchRes);//
        }
    }

    @RequestMapping("/get-history-search")
    public Result historySearch(HttpSession session){
        log.info("请求get-history-search成功");
        String sessionId = session.getId();
        if(sessionId==null){
            return Result.error("登录状态为空");
        }
        else {
            String uid = session.getAttribute("uid").toString();
            return Result.success(newsnovaService.getHistorySearch(uid));//
        }
    }

    @RequestMapping("/browse")
    public Result browse(HttpSession session,
            @RequestBody BrowseRecord browseRecord){
        log.info("请求browse成功");
        String sessionId = session.getId();
        if(sessionId==null){
            return Result.error("登录状态为空");
        }
        else {
            if (browseRecord.getId() == 0) {
                String uid = session.getAttribute("uid").toString();
                browseRecord.setUid(uid);
                Integer RecordId = newsnovaService.addHistoryBrowse(browseRecord);
                return Result.success(RecordId);
            } else {
                newsnovaService.modifyLastBrowseTime(browseRecord.getId());
                return Result.success();
            }
        }
    }

    @RequestMapping("set-like")
    public Result like(@RequestParam(value= "id") Integer id, HttpSession session){
        log.info("请求set-like成功");
        String sessionId = session.getId();
        if(sessionId==null){
            return Result.error("登录状态为空");
        }
        else {
            newsnovaService.setLiked(id);
            return Result.success();
        }
    }

    @RequestMapping("/delete-all-record")
    public Result deleteAllRecord(HttpSession session){
        log.info("请求删除全部历史搜索记录成功");
        String sessionId = session.getId();
        if(sessionId==null){
            return Result.error("登录状态为空");
        }
        else {
            String uid = session.getAttribute("uid").toString();
            newsnovaService.deleteAll(uid);
            return Result.success();
        }
    }

    @RequestMapping("/delete-search-record")
    public Result deleteSearchRecord(@RequestParam(value= "id") Integer id,HttpSession session){
        log.info("请求删除单条历史搜索记录成功");
        String sessionId = session.getId();
        if(sessionId==null){
            return Result.error("登录状态为空");
        }
        else {
            newsnovaService.deleteHistory(id);
            return Result.success();
        }
    }
}
