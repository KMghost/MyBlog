<template>
	<div>
		<el-container>
			<el-header class="homeHeader">
				<div class="title">云E办</div>
				<el-dropdown class="userInfo">
					<span class="el-dropdown-link">
						{{ user.name }}<i><img :src="user.userFace"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>个人中心</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item>注销登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu router unique-opened>
						<el-submenu :index="index+''" v-for="(items,index) in routes"
									v-if="!items.hidden"
									:key="index">
							<template slot="title">
								<i :class="items.iconCls" style="margin-right: 5px"></i>
								<span>{{ items.name }}</span>
							</template>
							<el-menu-item :index="children.path"
										  v-for="(children,indexJ) in items.children"
										  :key="indexJ">
								{{ children.name }}
							</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>
				<main>
					<router-view/>
				</main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			user: JSON.parse(window.sessionStorage.getItem('user')),
		}
	},
	computed: {
		routes() {
			console.log(this.$store.state)
			return this.$store.state.routes;
		}
	}
}
</script>

<style scoped>
.homeHeader {
	background: #409eff;
	display: flex;
	align-items: center;
	/* 分配弹性元素方式
	justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。
	justify-content: space-between;   均匀排列每个元素首个元素放置于起点，末尾元素放置于终点
	justify-content: space-around;   均匀排列每个元素每个元素周围分配相同的空间
	justify-content: space-evenly;   均匀排列每个元素每个元素之间的间隔相等
	justify-content: stretch;        均匀排列每个元素 'auto'-sized 的元素会被拉伸以适应容器的大小 */
	justify-content: space-between;
	padding: 0 15px;
	box-sizing: border-box;
}

.homeHeader .title {
	font-size: 30px;
	font-family: 华文楷体;
	color: white;
}

.userInfo .userInfo {
	cursor: pointer;
}

/*elementUi 内置样式*/
.el-dropdown-link img{
	width: 48px;
	height: 48px;
	border-radius: 24px;
	margin-left: 8px;
}
</style>
