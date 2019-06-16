<template>
	<input class="textfield" :value="value" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
	name: 'textfield',
	props: ['value']
}
</script>
