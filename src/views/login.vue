<template>
    <div class="loginbBody">
        <div class="loginDiv">
            <div class="login-content">
                <h1 class="login-title">用户登录</h1>
                
                <el-form :model="loginForm" label-width="100px"
                         :rules="rules" ref="loginForm">
                    <el-form-item label="编号" prop="userId">
                        <el-input style="width: 200px" type="text" v-model="loginForm.userId"
                                  autocomplete="off" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input style="width: 200px" type="password" v-model="loginForm.password"
                                  show-password autocomplete="off" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="confirm">确 定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                loginForm:{
                    userId:'',
                    password:''
                },

                // 输入信息长度验证
                rules:{
                    userId: [
                        { required: true, message: '请输入用户编号', trigger: 'blur' },
                        { min: 2, max: 5, message: '用户名长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输密码', trigger: 'blur' },
                        { min: 2, max: 5, message: '密码长度在 2 到 5 个字符', trigger: 'blur' }
                    ]
                }

            }
        },
        methods:{
            // 登录后跳转到主页
            confirm(){
                this.$refs.loginForm.validate((valid) => {
                    if (valid) { //valid成功为true，失败为false
                        //去后台验证用户名密码，并返回token
                        this.$axios.post('http://localhost:8081/homepage/login',this.loginForm).then(res=>{
                            console.log(res.data)
                            if(res.data.code==200){
                                //存储userId和token到本地
                                this.$store.commit("setUserId", res.data.userId);
                                this.$store.commit("setToken", res.data.token);
                                //跳转到主页
                                this.$router.replace('/home');
                            }else{
                                alert('用户名或密码错误！');
                                return false;
                            }
                        });
                    } else {
                        console.log('校验失败');
                        return false;
                    }
                });
            }

        }
    }

</script>


<style scoped >
    .loginbBody {
        width: 100%;
        height: 100%;
        background-color: #B3C0D1;
    }
    .loginDiv {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -250px;
        width: 450px;
        height: 330px;
        background: #fff;
        border-radius: 5%;

    }
    .login-title {
        margin: 20px 0;
        text-align: center;
    }
    .login-content {
        width: 400px;
        height: 250px;
        position: absolute;
        top: 25px;
        left: 25px;
    }
</style>
