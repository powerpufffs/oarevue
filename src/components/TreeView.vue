<template>
	<div id="treeView">
		<Tree 
			v-for="(parent, index) in data"
			:name='parent.name'
			:children='parent.children'
			:depth='0'
			:key='index'
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
