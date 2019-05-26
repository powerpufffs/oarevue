<template>
    <div class="flex flex-row w-full h-full">
        <Sidebar>
            <div class="text-white h-24 text-3xl">OARE Database</div>
            <div class="bg-oSelect h-10">
                <input type="text" class="w-5/6 h-5/6">
            </div>
            <div class="bg-oDark pl-4 py-1 centerY text-lg text-blue-200 uppercase ">Current Directory</div>
            <div class=""></div>
            <div class="bg-oDark pl-4 py-1 centerY text-lg text-blue-200 uppercase ">Site Information</div>
            <div class="">
                About
            </div>
            <div class="">Settings</div>
        </Sidebar>
        <div class="flex flex-col bg-oBlue w-full">
            <Header class="h-24">
            </Header>
            <div class="bg-white mx-8 h-full rounded-lg">
                hi
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default {
    name: 'home',
    components: {
        Sidebar,
        Header
    }
}
</script>

<style>

</style>
