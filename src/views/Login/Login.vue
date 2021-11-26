<template>
	<div>
		<el-form ref="loginForm" :rules="rules" :model="loginForm" class="loginContainer">
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
			captchaUrl: "/captcha?time=" + new Date(),
			loginForm: {
				username: 'admin',
				password: '123456',
				code: ''
			},
			checked: true,
			rules: {
				username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
				password: [{required: true, message: '请输入密码', trigger: 'blur'}],
				code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
			}
		}
	},
	methods: {
		updateChecked() {
			this.captchaUrl = "/captcha?time=" + new Date()
		},
		submitLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					alert('submit!');
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
