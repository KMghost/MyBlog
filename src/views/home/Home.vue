<template>
	<div>
		<el-container>
			<el-header>Header</el-header>
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
	computed: {
		routes() {
			console.log(this.$store.state)
			return this.$store.state.routes;
		}
	}
}
</script>

<style scoped>

</style>
