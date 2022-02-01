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
			<span class="custom-tree-node" slot-scope="{ node, data }" style="display: flex;justify-content: space-between;width: 100%">
				<span>{{ data.name }}</span>
				<span>
					<el-button
							  type="primary"
							  size="mini"
							  class="depBtn"
							  @click="() => append(data)">
						添加部门
					</el-button>
					<el-button
							  type="danger"
							  size="mini"
							  class="depBtn"
							  @click="() => remove(node, data)">
						删除部门
					</el-button>
        		</span>
      	</span>
		</el-tree>
	</div>
</template>

<script>
export default {
	name: "DepMana",
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
	},
	data() {
		return {
			filterText: '',
			deps: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			}
		}
	}
}
</script>

<style scoped>
	.depBtn {
		padding: 2px;
	}
</style>
