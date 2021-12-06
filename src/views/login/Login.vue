<template>
	<div>
		<el-form ref="loginForm" :rules="rules"
				 v-loading="loading"
				 element-loading-text="正在登录中，请稍后。。"
				 element-loading-spinner="el-icon-loading"
				 element-loading-background="rgba(0,0,0,0.8)"
				 :model="loginForm" class="loginContainer">
			<h3 class="loginTitle">系统登录</h3>
			<el-form-item prop="username">
				<el-input type="text" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
			</el-form-item>

			<el-form-item prop="password">
				<el-input type="password" auto-complete="false" placeholder="请输入密码"
						  v-model="loginForm.password"></el-input>
			</el-form-item>

			<el-form-item prop="code">
				<el-input type="text" auto-complete="false" placeholder="点击图片更新验证码" v-model="loginForm.code"
						  style="width: 250px;margin-left: 5px"></el-input>
				<img :src="captchaUrl" @click="updateChecked"/>
			</el-form-item>
			<el-checkbox v-model="checked" class="loginRemenber"> 记住我</el-checkbox>
			<el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			captchaUrl: "/api/captcha?time=" + new Date(),
			loginForm: {
				username: 'admin',
				password: '123456',
				code: ''
			},
			checked: true,
			loading: false,
			rules: {
				username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
				password: [{required: true, message: '请输入密码', trigger: 'blur'}],
				code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
			}
		}
	},
	methods: {
		updateChecked() {
			this.captchaUrl = "/api/captcha?time=" + new Date()
		},
		submitLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loading = true;
					this.postRequest('/login', this.loginForm).then(resp => {
						this.loading = false
						if (resp) {
							// 存储用户 token
							const tokenStr = resp.obj.tokenHead + resp.obj.token;
							window.sessionStorage.setItem('tokenStr', tokenStr)
							/*设置页面跳转，replace：替换页面，无法返回上一个页面；push：可以返回上一个页面。*/
							/*$route 和 $router的区别
								$route：
									1、$route是一个跳转的路由对象，每一个路由都会有一个$route对象，是一个局部的对象
										可以获取对应的name，path，params，query等
								$router：
									1、使用 vue-router 的全局对象，通过Vue.use(VueRouter)和Vu构造函数得到一个router的实例对象
									2、$router.push({path:'home'})，本质是向history栈中添加一个路由，在我们看来是切换路由，但本质是在添加一个history记录
										$router.replace({path:'home'})，//替换路由，没有历史记录
							* */
							let path = this.$route.query.redirect;
							this.$router.replace(path == '/' || path == undefined ? '/home' : path)
						}
					})
				} else {
					this.$message.error('error submit!!')
					return false;
				}
			});
		}
	}
}
</script>

<style scoped>
/* 登录框 */
.loginContainer {
	border-radius: 15px;
	background-clip: padding-box;
	margin: 180px auto;
	width: 350px;
	padding: 15px 35px 15px 35px;
	background: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
	margin: 0px auto 40px auto;
	text-align: center;
}

.loginRemenber {
	text-align: left;
	margin: 0px 0px 15px 0px;
}

</style>
<style>
/*验证码*/
.el-form-item__content {
	display: flex;
	align-items: center;
}
</style>
