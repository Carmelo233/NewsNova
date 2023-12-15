package com.newsnova.backend.controller;

import com.alipay.api.diagnosis.DiagnosisUtils;
import com.newsnova.backend.pojo.Result;
import com.newsnova.backend.service.NewsnovaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.CertAlipayRequest;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayConfig;
import com.alipay.api.response.AlipaySystemOauthTokenResponse;
import com.alipay.api.request.AlipaySystemOauthTokenRequest;
import com.alipay.api.FileItem;
import java.util.Base64;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@Slf4j
@RequestMapping("/newsnova")
public class UserController {
    @Autowired
    NewsnovaService newsnovaService;
    @Value("${arg.private-key}")
    String privateKey;
    @Value("${arg.public-key}")
    String alipayPublicKey;
    @Value("${arg.app.id}")
    String appId;

    @RequestMapping("/pass-code")
    public Result passCode(@RequestParam(value="auth_code") String authCode,
                           HttpServletRequest httpRequest) throws AlipayApiException{
        AlipayConfig alipayConfig = new AlipayConfig();
        alipayConfig.setServerUrl("https://openapi.alipay.com/gateway.do");
        alipayConfig.setAppId(appId);
        alipayConfig.setPrivateKey(privateKey);
        alipayConfig.setFormat("json");
        alipayConfig.setAlipayPublicKey(alipayPublicKey);
        alipayConfig.setCharset("UTF-8");
        alipayConfig.setSignType("RSA2");
        AlipayClient alipayClient = new DefaultAlipayClient(alipayConfig);
        AlipaySystemOauthTokenRequest request = new AlipaySystemOauthTokenRequest();
        request.setCode(authCode);
        request.setGrantType("authorization_code");
        //request.setRefreshToken("201208134b203fe6c11548bcabd8da5bb087a83b");
        AlipaySystemOauthTokenResponse response = alipayClient.execute(request);
        System.out.println(response.getBody());
        if (response.isSuccess()) {
            System.out.println("调用成功");
        } else {
            System.out.println("调用失败");
        }
        String uid = response.getOpenId();
        //String uid = response.getUserId();
        log.info(uid);
        HttpSession session = httpRequest.getSession(true);
        session.setAttribute("uid",uid);
        String sessionId = session.getId();
        log.info(sessionId);
        return Result.success();
    }

    @RequestMapping("/get-history-browse")
    public Result historyBrowse(HttpSession session){
        String uid = session.getAttribute("uid").toString();
        log.info(uid);
        return Result.success(newsnovaService.getHistoryBrowse(uid));
    }

    @RequestMapping("/get-liked-list")
    public Result likedList(HttpSession session){
        String uid = session.getAttribute("uid").toString();
        return Result.success(newsnovaService.getLikedList(uid));
    }
}
