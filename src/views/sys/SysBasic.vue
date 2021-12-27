<template>
	<div>
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="部门管理" name="DepMana">
				<DepMana/>
			</el-tab-pane>
			<el-tab-pane label="职位管理" name="PosMana">
				<PosMana/>
			</el-tab-pane>
			<el-tab-pane label="职称管理" name="JoblevelMana">
				<JoblebelMana/>
			</el-tab-pane>
			<el-tab-pane label="奖惩规则" name="EcMana">
				<EcMana/>
			</el-tab-pane>
			<el-tab-pane label="权限组" name="PermissMana">
				<PermissMana/>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import DepMana from "../../components/basic/DepMana";
import PosMana from "../../components/basic/PosMana";
import JoblebelMana from "../../components/basic/JoblevelMana";
import EcMana from "../../components/basic/EcMana";
import PermissMana from "../../components/basic/PermissMana";

export default {
	name: "SysBasic",
	data() {
		return {
			activeName: "PermissMana"
		}
	},
	components: {
		DepMana,
		PosMana,
		JoblebelMana,
		EcMana,
		PermissMana

	}
}
</script>

<style scoped>

</style>
