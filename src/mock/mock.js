//引入 npm 安装的 mockjs
const Mock = require('mockjs')   

// 获取 mock.Random 对象
const Random = Mock.Random;

// 登录，此地址与login登录地址对应
Mock.mock('/login','post', (param)=>{  
    let state=0;
    let body = JSON.parse(param.body);
    console.log(body)
    let data;
    //模拟用户名和密码都是 admin
    if(body.name=='admin'&&body.password=='admin'){
        state=1;
        data = Mock.mock({
            "token": "@guid()",//模拟token
            "name": "@cname",//随机生成中文名字
        });
    }

    return{
        "state":state,
        "vData":data
    }
});

//退出
Mock.mock('/logout','post', ()=>{
    return {state:1}
});
