<template>
	<div id="treeView">
		<Tree 
			v-for="parent in data"
			:key="parent.id"
			:data="parent"
			:depth='0'
		/>
	</div>
</template>

<script>
import Tree from '../other/Tree'

export default {
	name: 'treeView',
	props: ["data"],
	components: {
		Tree
	},
}
</script>

<style>

</style>
