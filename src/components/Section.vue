<template>
	<div class="Section bg-oDark text-oSelect text-xl pl-4 flex items-center">
		{{ title }}
	</div>
</template>

<script>
export default {
	props: ['title'],
	name: 'Section',
}
</script>

<style scoped>
	.Section {
		height: 38px;
	}
</style>
