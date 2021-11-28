<template>
	<div>
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu @select="menuClick">
						<el-submenu index="1">
							<template slot="title"><i class="el-icon-location"></i>导航一</template>
								<el-menu-item index="test1">选项1</el-menu-item>
								<el-menu-item index="test2">选项2</el-menu-item>
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
	methods: {
		menuClick(index){
			this.$router.push(index)
		}
	}
}
</script>

<style scoped>

</style>
