<template>
   <div class="flex flex-col m-auto w-11/12">
       <Header class="mt-10">
           <div class="text-3xl font-sans">Welcome</div>
           <div class="ml-6 text-xl text-gray-600">to the Old Assyrian Research Environment Database</div>
       </Header>
       <ContentView class="mt-2 font-sans">
           <h1 class="text-2xl text-gray-700">Introduction</h1>
           <p class="text-base text-gray-600">
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae 
               repellendus distinctio accusantium soluta quidem ipsa nobis sapiente 
               libero veritatis nesciunt fuga, perferendis omnis rerum et iusto esse iste beatae voluptas, 
               harum exercitationem vitae quisquam dicta cupiditate excepturi? Consectetur, et illo?
           </p>
       </ContentView>
   </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ContentView from '../components/ContentView'

export default {
    name: 'home',
    components: {
        Sidebar,
        Header,
        ContentView,
    }
}
</script>

<style>

</style>
