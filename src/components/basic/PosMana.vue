<template>
	<div>
		<div>
			<el-input
					size="small"
					class="addPosInput"
					placeholder="添加职位..."
					suffix-icon="el-icon-plus"
					@keydown.enter.native="addPosition"
					v-model="pos.name">
			</el-input>
			<el-button size="small" icon="el-icon-plus" type="primary" @click="addPosition">添加</el-button>
		</div>
		<div>
			<el-table
					class="posManaMain"
					size="small"
					stripe
					border
					:data="positions"
					@selection-change="handleSelectionChange"
					style="width: 70%">
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
						label="职位"
						width="120">
				</el-table-column>
				<el-table-column
						prop="createDate"
						label="创建时间"
						width="200">
				</el-table-column>
				<el-table-column
						prop="enabled"
						label="是否启用"
						width="120">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
						<el-tag v-else type="danger">未启用</el-tag>
					</template>
				</el-table-column>
				<el-table-column
						label="操作">
					<template slot-scope="scope">
						<!--scope.$index：获取数据下标 ,scope.row：获取数据的行号-->
						<el-button
								size="mini"
								@click="showEditView(scope.$index,scope.row)">编辑
						</el-button>
						<el-button
								size="mini"
								type="danger"
								@click="handleDelete(scope.$index,scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-button size="small" style="margin-top: 8px" type="danger" :disabled="this.multipleSelection.length == 0"
			@click="deleteMany">批量删除</el-button>
		<el-dialog
				title="编辑职位"
				:visible.sync="dialogVisible"
				width="30%">
			<tr>
				<td>
					<el-tag>职位名称</el-tag>
				</td>
				<td>
					<el-input v-model="updatePos.name" size="small" class="updatePosInput"></el-input>
				</td>
			</tr>
			<tr>
				<td>
					<el-tag>是否启用</el-tag>
				</td>
				<td>
					<el-switch
							style="margin-left: 10px;"
							v-model="updatePos.enabled"
							active-color="#13ce66"
							inactive-color="#ff4949">
					</el-switch>
				</td>
			</tr>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogVisible = false">取 消</el-button>
				<el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "PosMana",
	data() {
		return {
			pos: {
				name: ''
			},
			positions: [],
			dialogVisible: false,
			updatePos: {
				name: '',
				enabled: '',
			},
			multipleSelection: [],
		}
	},
	methods: {
		deleteMany(){
			this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条职位, 是否继续 ? ', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}
			).then(() => {
				let ids = '?'
				this.multipleSelection.forEach(item=>{
					ids += 'ids=' + item.id + '&'
				})
				this.deleteRequest('/system/basic/pos', ids).then(resp => {
					if (resp) {
						this.initPositions()
					}
				})
			}).catch(() => {
			});
		},
		handleSelectionChange(val){
			this.multipleSelection = val;
			console.log(val);
		},
		doUpdate(){
			this.putRequest('/system/basic/pos',this.updatePos).then(resp=>{
				if (resp){
					this.initPositions();
					this.dialogVisible = false
				}
			})
		},
		addPosition() {
			if (this.pos.name) {
				this.postRequest('/system/basic/pos', this.pos).then(resp => {
					if (resp) {
						this.initPositions()
						this.pos.name = ''
					}
				})
			} else {
				this.$message.error('职位名称不能为空！');
			}
		},
		showEditView(index, data) {
			// 拷贝一份新的数据，不要再源数据上直接赋值
			Object.assign(this.updatePos,data);
			// this.updatePos = data;
			this.dialogVisible = true;

		},
		handleDelete(index, data) {
			this.$confirm('此操作将永久删除[' + data.name + ']此职位, 是否继续 ? ', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}
			).then(() => {
				this.deleteRequest('/system/basic/pos', {'id': data.id}).then(resp => {
					if (resp) {
						this.initPositions()
					}
				})
			}).catch(() => {
			});
		},
		initPositions() {
			this.getRequest('/system/basic/pos').then(resp => {
				if (resp) {
					this.positions = resp;
				}
			})
		}
	},
	/*相当于 init 方法*/
	mounted() {
		this.initPositions();
	}
}
</script>

<style scoped>
.addPosInput {
	width: 300px;
	margin-right: 8px;
}

.posManaMain {
	margin-top: 10px;
}

.updatePosInput {
	width: 200px;
	margin-left: 8px;
}

tr {
	display: block;
	margin-top: 6px;
}
</style>
