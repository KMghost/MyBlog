<template>
	<div>
		<div>
			<el-input size="small" v-model="jl.name" placeholder="添加职称等级..." prefix-icon="el-icon-plus"
					  style="width: 300px"></el-input>
			<el-select size="small" v-model="jl.titleLevel" placeholder="请选择"
					   style="margin-left: 6px;margin-right: 6px">
				<el-option
						v-for="item in titleLevels"
						:key="item"
						:label="item"
						:value="item">
				</el-option>
			</el-select>
			<el-button type="primary" size="small" icon="el-icon-plus" @click="addJobLevel">添加</el-button>
		</div>
		<div style="margin-top: 10px;">
			<el-table
					:data="jls"
					stripe
					border
					size="small"
					style="width: 70%"
					@selection-change="handleSelectionChange">
				<el-table-column
						type="selection"
						width="55">
				</el-table-column>
				<el-table-column
						prop="id"
						label="编号"
						width="55">
				</el-table-column>
				<el-table-column
						prop="name"
						label="职称名称"
						width="150">
				</el-table-column>
				<el-table-column
						prop="titleLevel"
						label="职称等级"
						width="100">
				</el-table-column>
				<el-table-column
						prop="createDate"
						label="创建时间"
						width="150">
				</el-table-column>
				<el-table-column
						prop="enabled"
						label="是否启用"
						width="80">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
						<el-tag v-else type="danger">未启用</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<!-- scope：作用域插槽，用来获取作用域中:data返回的数据 -->
					<template slot-scope="scope">
						<el-button size="small" @click="showEditView(scope.row)">编辑</el-button>
						<el-button size="small" type="danger" @click="deleteHandler(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-button size="small" style="margin-top: 10px;" :disabled="this.multipleSelection.length == 0"
					   type="danger" @click="deleteMany">批量删除</el-button>
		</div>
		<el-dialog
				title="编辑职称"
				:visible.sync="dialogVisible"
				width="30%">
			<table>
				<tr>
					<td>
						<el-tag>职位名称</el-tag>
					</td>
					<td>
						<el-input v-model="updateJobLevel.name" size="small" class="updatejobLevelInput"></el-input>
					</td>
				</tr>
				<tr>
					<td>
						<el-tag>职称等级</el-tag>
					</td>
					<td>
						<el-select size="small" v-model="updateJobLevel.titleLevel" placeholder="请选择"
								   class="updatejobLevelInput">
							<el-option
									v-for="item in titleLevels"
									:key="item"
									:label="item"
									:value="item">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>
						<el-tag>是否激活</el-tag>
					</td>
					<td>
						<el-switch
								style="margin-left: 10px;"
								v-model="updateJobLevel.enabled"
								active-color="#13ce66"
								inactive-color="#ff4949">
<!--								展示的文本-->
<!--								active-text="已激活"-->
<!--								inactive-text="未激活"-->
<!--						>-->
						</el-switch>
					</td>
				</tr>
			</table>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogVisible = false">取 消</el-button>
				<el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "JoblebelMana",
	data() {
		return {
			jl: {
				name: '',
			},
			titleLevels: [
				'正高级',
				'副高级',
				'中级',
				'初级',
				'员级',
			],
			jls: [],
			dialogVisible: false,
			updateJobLevel: {
				name: '',
				titleLevel: '',
				enabled: false
			},
			multipleSelection: []
		}
	},
	mounted() {
		this.initJls();
	},
	methods: {
		deleteMany(){
			this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条职称, 是否继续 ? ', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}
			).then(() => {
				let ids = '?'
				this.multipleSelection.forEach(item=>{
					ids += 'ids=' + item.id + '&'
				})
				this.deleteRequest('/system/basic/joblevel', ids).then(resp => {
					if (resp) {
						this.initJls();
					}
				})
			}).catch(() => {
			});
		},
		handleSelectionChange(val){
			this.multipleSelection = val;
		},
		doUpdate() {
			this.putRequest('/system/basic/joblevel', this.updateJobLevel).then(resp => {
				if (resp) {
					this.initJls()
					this.dialogVisible = false
				}
			})
		},
		showEditView(data) {
			Object.assign(this.updateJobLevel, data)
			this.dialogVisible = true
		},
		deleteHandler(data) {
			this.$confirm('此操作将永久删除[' + data.name + ']此职称, 是否继续 ? ', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}
			).then(() => {
				this.deleteRequest('/system/basic/joblevel', data).then(resp => {
					if (resp) {
						this.initJls()
					}
				})
			}).catch(() => {
			});
		},
		addJobLevel() {
			this.postRequest('/system/basic/joblevel', this.jl).then(resp => {
				if (resp) {
					this.initJls()
				} else {
					this.$message.error('职称名称 和 职称等级 不能为空！');
				}
			})
		},
		initJls() {
			this.getRequest('/system/basic/joblevel').then(resp => {
				if (resp) {
					this.jls = resp;
					this.jl.name = ''
					this.jl.titleLevel = ''
				}
			})
		}
	}
}
</script>

<style scoped>
.updatejobLevelInput {
	width: 200px;
	margin-left: 8px;
}

tr {
	display: block;
	margin-top: 6px;
}
</style>
