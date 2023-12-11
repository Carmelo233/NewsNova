package com.newsnova.backend.pojo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private int code;
    private String msg;
    private Object data;
    //成功响应
    public static Result success(){
        return new Result(1,"成功发送请求",null);
    }
    //响应失败
    public static Result error(){
        return new Result(0,"请求失败",null);
    }
    //成功响应 携带数据返回
    public static Result success(Object res){
        return new Result(1,"成功发送请求",res);
    }
}
