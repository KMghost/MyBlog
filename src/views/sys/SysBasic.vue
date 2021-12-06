<template>
	<div>
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="部门管理" name="first">
				<DepMana/>
			</el-tab-pane>
			<el-tab-pane label="职位管理" name="second">
				<PosMana/>
			</el-tab-pane>
			<el-tab-pane label="职称管理" name="third">
				<JoblebelMana/>
			</el-tab-pane>
			<el-tab-pane label="奖惩规则" name="fourth">
				<EcMana/>
			</el-tab-pane>
			<el-tab-pane label="权限组" name="five">
				<PermissMana/>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import DepMana from "../../components/basic/DepMana";
import EcMana from "../../components/basic/EcMana";
import JoblebelMana from "../../components/basic/JoblevelMana";
import PermissMana from "../../components/basic/PermissMana";
import PosMana from "../../components/basic/PosMana";

export default {
	name: "SysBasic",
	data() {
		return {
			activeName: "third"
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
