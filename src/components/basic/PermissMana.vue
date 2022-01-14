<template>
	<div>
		<div class="permissManaTool">
			<el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
				<template slot="prepend">ROLE_</template>
			</el-input>
			<el-input size="small" v-model="role.nameZh" placeholder="请输入角色中文名"></el-input>
			<el-button size="small" type="primary" icon="el-icon-plus">添加角色</el-button>
		</div>
		<div class="permissManaMain">
			<el-collapse v-model="activeName" accordion @change="change">
				<el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span>可访问资源</span>
							<el-button style="float: right; padding: 3px 0; color: #ff0000" type="text"
									   icon="el-icon-delete"></el-button>
						</div>
						<div>
							<el-tree show-checkbox
									 :data="allMenus"
									 :props="defaultProps"
									 ref="tree"
									 :default-checked-keys="selectedMenus"
									 node-key="id"></el-tree>
							<div style="display: flex;justify-content: flex-end">
								<el-button size="mini" @click="cancelUpdate">取消修改</el-button>
								<el-button size="mini" @click="doUpdate(r.id,index)" type="primary">确认修改</el-button>
							</div>
						</div>
					</el-card>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script>
export default {
	name: "PermissMana",
	data() {
		return {
			role: {
				nameZh: '',
				name: ''
			},
			roles: [],
			allMenus: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			selectedMenus: [],
			activeName: '-1'
		}
	},
	mounted() {
		this.initRoles();
	},
	methods: {
		cancelUpdate(){
			console.log(this.activeName)
			this.activeName = '-1'
		},
		doUpdate(rid, index) {
			/*
			*ref 有三种用法：
			*	1、ref 加在普通的元素上，用this.ref.name 获取到的是dom元素
			*	2、ref 加在子组件上，用this.ref.name 获取到的是组件实例，可以使用组件的所有方法。
			*	3、如何利用 v-for 和 ref 获取一组数组或者dom 节点
			* */
			console.log(this.$refs.tree)
			let tree = this.$refs.tree[index];
			let selectedKeys = tree.getCheckedKeys(true);
			let url = '/system/basic/permiss/?rid=' + rid;
			selectedKeys.forEach(key => {
				url += '&media=' + key;
			});
			console.log(selectedKeys)
			this.putRequest(url).then(resp => {
				if (resp) {
					this.initRoles();
					this.activeName = -1;
				}
			})
		},
		change(rid) {
			if (rid) {
				this.initAllMenus();
				this.initSelectedMenus(rid);
			}
		},
		initSelectedMenus(rid) {
			this.getRequest('/system/basic/permiss/mid/' + rid).then(resp => {
				if (resp) {
					this.selectedMenus = resp;
				}
			})
		},
		initAllMenus() {
			this.getRequest('/system/basic/permiss/menus').then(resp => {
				if (resp) {
					this.allMenus = resp;
				}
			})
		},
		initRoles() {
			this.getRequest('/system/basic/permiss').then(resp => {
				if (resp) {
					this.roles = resp;
				}
			})
		}
	}
}
</script>

<style scoped>
.permissManaTool {
	display: flex;
	display: flow;
	justify-content: flex-start;
}

.permissManaTool .el-input {
	width: 300px;
	margin-right: 6px;
}

.permissManaMain {
	margin-top: 10px;
	width: 800px;
}
</style>
