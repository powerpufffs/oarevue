<template>
	<div id="treeView">
		<Tree 
			:name='data.name'
			:children='data.children'
			:depth='0'
		/>
	</div>
</template>

<script>
import Tree from '../other/Tree'
import axios from 'axios'
import { response } from '../other/treeData'

export default {
	name: 'treeView',
	data() {
		return {
			data: response
		}
	},
	components: {
		Tree
	},
	// async created() {
	// 	try {
	// 		this.data = await axios.get('https://oare-test.herokuapp.com/api/categories')
	// 		console.log('hi')
	// 	} catch (error) {
	// 		console.log("didn't work")
	// 		console.log(error)
	// 	}
	// }
}
</script>

<style>

</style>
