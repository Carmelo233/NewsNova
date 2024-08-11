package com.newsnova.backend.controller;
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
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayConfig;
import com.alipay.api.response.AlipaySystemOauthTokenResponse;
import com.alipay.api.request.AlipaySystemOauthTokenRequest;
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
        log.info("成功请求pass-code接口——1/3");
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
        //request.setRefreshToken("201208134b203fe6c11548bcabd8da5bb087a83b");//刷新码
        AlipaySystemOauthTokenResponse response = alipayClient.execute(request);
        if (response.isSuccess()) {
            log.info("获取userid成功，输出response信息——2/3");
            System.out.println(response.getBody());
            String uid = response.getOpenId();
            log.info("uid为："+uid);
            HttpSession session = httpRequest.getSession(true);
            log.info("成功创建会话——3/3");
            session.setAttribute("uid",uid);
            String sessionId = session.getId();
            log.info(sessionId);
            return Result.success(uid);
        } else {
            log.info("获取userid失败");
            return Result.error();
        }
    }

    @RequestMapping("/get-history-browse")
    public Result historyBrowse(HttpSession session){
        log.info("请求get-history-browse成功");
        String sessionId = session.getId();
        if(sessionId==null){
            return Result.error("登录状态为空");
        }
        else{
            String uid = session.getAttribute("uid").toString();
            log.info("uid为："+uid);
            return Result.success(newsnovaService.getHistoryBrowse(uid));
        }

    }

    @RequestMapping("/get-liked-list")
    public Result likedList(HttpSession session){
        log.info("请求get-liked-list成功");
        String sessionId = session.getId();
        if(sessionId==null){
            return Result.error("登录状态为空");
        }
        else{
            String uid = session.getAttribute("uid").toString();
            log.info("uid为："+uid);
            return Result.success(newsnovaService.getLikedList(uid));
        }
    }
}
