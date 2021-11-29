<template>
	<div>
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu router>
						<el-submenu index="1" v-for="(items,index) in this.$router.options.routes"
									v-if="!items.hidden"
									:key="index">
							<template slot="title">
								<i class="el-icon-location"></i>
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
	methods: {

	}
}
</script>

<style scoped>

</style>
