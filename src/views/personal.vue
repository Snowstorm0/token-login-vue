<template>
    <div>
        <table>
            <tr>
                <td>编号</td>
                <td>姓名</td>
            </tr>
            <tr v-for="user in users"  :key="user">
                <td>{{user.userId}}</td>
                <td>{{user.username}}</td>
            </tr>
        </table>
    </div>
</template>


<script>
    export default {
        name: "personal",
        data(){
            return {
                users:[
                ],
                loginForm:{
                    userId:'',
                    password:''
                },
            }
        },

        created() {
            var that=this;
            this.$axios.post('http://localhost:8081/homepage/personal',this.loginForm).then(res=>{
                console.log(res.data)
                that.users=res.data;
            });
        }

    }
</script>


<style scoped>
</style>