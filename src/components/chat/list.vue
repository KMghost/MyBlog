<template>
	<div id="list">
		<ul style="padding-left: 0px;">
			<li v-for="item in admins" :class="{ active: item.id === currentSessionId }"
				v-on:click="changeCurrentSessionId(item.id)">
				<!--   :class="[item.id === currentSessionId ? 'active':'']" -->
				<img class="avatar" :src="item.userFace" :alt="item.name">
				<p class="name">{{ item.name }}</p>
			</li>
		</ul>
	</div>
<!--	<div>-->
<!--		<div>{{JSON.stringify(admins)}}</div>-->
<!--&lt;!&ndash;		<div>{{JSON.stringify(currentSessionId)}}</div>&ndash;&gt;-->
<!--	</div>-->
</template>

<script>
import {mapState} from 'vuex'

export default {
	name: 'list',
	data() {
		return {}
	},
	computed: mapState([
		'admins',
		'currentSessionId',
	]),
	methods: {
		changeCurrentSessionId: function (id) {
			this.$store.commit('changeCurrentSessionId', id)
		}
	}
}
</script>

<style lang="scss" scoped>
#list {
	li {
		padding: 0px 15px;
		border-bottom: 1px solid #292C33;
		cursor: pointer;

		&:hover {
			background-color: rgba(255, 255, 255, 0.03);
		}
	}

	li.active { /*注意这个是.不是冒号:*/
		background-color: rgba(255, 255, 255, 0.1);
	}

	.avatar {
		border-radius: 2px;
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}

	.name {
		display: inline-block;
		margin-left: 15px;
	}
}
</style>
