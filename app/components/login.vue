<script setup lang="ts">
</script>
<template>
    <div id="sign-in-page">
        <div id="effect"></div>
        <form>
        </form>
    </div>
</template>

<style scoped>

#effect {
    display:none;
}
@media screen and (max-width:30em) {
    #sign-in-page {
        display: grid;
        grid-template-columns: 200px 1fr;
    }    
    #effect{
        background-color: blue;
        display: block;
    }
}
</style>