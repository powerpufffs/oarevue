<template>
	<div id="treeView">
		<Tree 
			v-for="(parent, index) in data.data"
			:name='parent.name'
			:children='parent.children'
			:depth='0'
			:key='index'
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
			data: []
		}
	},
	components: {
		Tree
	},
	async created() {
		// this.data = response
		try {
			this.data = await axios.get('https://oare-test.herokuapp.com/api/categories')
		} catch (error) {
			console.log("didn't work")
			console.log(error)
		}
	}
}
</script>

<style>

</style>
