<template>
	<div class="cell">
		<slot></slot>
		<div class="ml-4">{{ title }}</div>
	</div>
</template>

<script>
export default {
	props: ['title'],
	name: 'cell',
}
</script>
