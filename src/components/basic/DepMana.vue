<template>
	<div style="width: 500px">
		<el-input
				placeholder="请输入部门名称进行搜索..."
				prefix-icon="el-icon-search"
				v-model="filterText">
		</el-input>

		<el-tree
				:data="deps"
				:props="defaultProps"
				:filter-node-method="filterNode"
				:expand-on-click-node="false"
				ref="tree">
			<span class="custom-tree-node" slot-scope="{ node, data }"
				  style="display: flex;justify-content: space-between;width: 100%">
				<span>{{ data.name }}</span>
				<span>
					<el-button
							type="primary"
							size="mini"
							class="depBtn"
							@click="() => showAddDep(data)">
						添加部门
					</el-button>
					<el-button
							type="danger"
							size="mini"
							class="depBtn"
							@click="() => deleteDep(data)">
						删除部门
					</el-button>
        		</span>
      	</span>
		</el-tree>
		<el-dialog
				title="添加部门"
				:visible.sync="dialogVisible"
				width="30%">
			<div>
				<table>
					<tr>
						<td>
							<el-tag>上级部门</el-tag>
						</td>
						<td>{{ pname }}</td>
					</tr>
					<tr>
						<td>
							<el-tag>部门名称</el-tag>
						</td>
						<td>
							<el-input v-model="dep.name" placeholder="请输入部门名称..."></el-input>
						</td>
					</tr>
				</table>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="doAddDep">确 定</el-button>
	  		</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "DepMana",
	data() {
		return {
			filterText: '',
			deps: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			dialogVisible: false,
			dep: {
				name: '',
				parentId: -1
			},
			pname: ''
		}
	},
	watch: {
		// 这里的filter 调用的是 filter-node-method
		// 这里的 val 是输入框中绑定的 filterText
		filterText(val) {
			this.$refs.tree.filter(val);
		}
	},
	mounted() {
		this.initDeps();
	},
	methods: {
		initDep() {
			this.dep = {
				name: '',
				parentId: -1
			};
			this.pname = '';
		},
		addDep2Deps(deps, dep) {
			for (let i = 0; i < deps.length; i++) {
				let d = deps[i];
				if (d.id == dep.parentId) {
					d.children = d.children.concat(dep);
					if (d.children.length > 0) {
						d.isParent = true;
					}
					return;
				} else {
					this.addDep2Deps(d.children, dep);
				}
			}
		},
		doAddDep() {
			this.postRequest('/system/basic/department/', this.dep).then(resp => {
				if (resp) {
					this.addDep2Deps(this.deps, resp.obj);
					this.dialogVisible = false;
					this.initDep();
				}
			})
		},
		showAddDep(data) {
			this.dep.parentId = data.id;
			this.pname = data.name;
			this.dialogVisible = true;

		},
		removeDepFromDeps(p, deps, id) {
			for (let i = 0; i < deps.length; i++) {
				let d = deps[i];
				if (d.id == id) {
					deps.splice(i, 1);
					if (deps.length == 0) {
						p.isParent = false;
					}
					return;
				} else {
					this.removeDepFromDeps(d, d.children, id);
				}
			}
		},
		deleteDep(data) {
			if (data.isParent) {
				this.$message.error('父部门删除失败！')
			} else {
				this.$confirm('此操作将永久删除[' + data.name + ']部门, 是否继续 ? ', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}
				).then(() => {
					this.deleteRequest('/system/basic/department/' + data.id).then(resp => {
						if (resp) {
							this.removeDepFromDeps(null, this.deps, data.id)
						}
					})
				}).catch(() => {
				});
			}
		},
		// 如果没有value，就全部展开，如果有值，
		// data 是当前结点下面的整条数据
		filterNode(value, data) {
			if (!value) return true;
			// 判断 data.name 是不是包含这个值
			return data.name.indexOf(value) !== -1;
		},
		initDeps() {
			this.getRequest('/system/basic/department/').then(resp => {
				if (resp) {
					this.deps = resp;
				}
			})
		}
	}
}
</script>

<style scoped>
.depBtn {
	padding: 2px;
}
</style>
