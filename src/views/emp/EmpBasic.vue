<template>
	<div>
		<div style="display: flex; justify-content: space-between">
			<div>
				<el-input style="width: 300px;margin-right: 10px" prefix-icon="el-icon-search"
						  placeholder="请输入员工名进行搜索"></el-input>
				<el-button type="primary" icon="el-icon-search">搜索</el-button>
				<el-button type="primary">
					<i class="fa fa-angle-double-down" aria-hidden="true"></i>高级搜索
				</el-button>
			</div>
			<div>
				<el-button type="success"><i class="fa fa-level-up" aria-hidden="true"></i>导入数据</el-button>
				<el-button type="success"><i class="fa fa-level-down" aria-hidden="true"></i>导出数据</el-button>
				<el-button type="primary" icon="el-icon-plus" style="margin-right: 20px">添加员工</el-button>
			</div>
		</div>
		<div></div>
	</div>
</template>

<script>
export default {
	name: "EmpBasic"
}
</script>

<style scoped>

</style>
