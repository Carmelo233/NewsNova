package com.newsnova.backend.config;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class RestTemplateConfig {
    private RestTemplate restTemplate = new RestTemplate();

    public JSONArray sendPost(String url,String val1,String val2) {
        String uri = url;
        MultiValueMap<String, Object> param = new LinkedMultiValueMap<>();
        if(val1 != null && val2 !=null){
        param.add("keyword", val1);
        param.add("type", val2);
        }else{
            param.add("type", "1");
        }

        System.out.println(param);
        String result = restTemplate.postForEntity
                (uri, param, String.class).getBody();
        JSONArray resultJson = JSON.parseArray(result);
        System.out.println(resultJson);
        return resultJson;
    }
}
