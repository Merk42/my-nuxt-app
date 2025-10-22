<script setup lang="ts">
import FormInput from '../components/FormInput.vue';
const username = ref("");
const password = ref("")

const cancontinue = computed(() => {
    return !!username.value && !!password.value
})

const handleSubmit = async () => {
    navigateTo('/overview')
}
</script>
<template>
    <div id="sign-in-page">
        <div id="effect">
            <h1>Welcome Back</h1>
        </div>
        <div id="form-cell">
            <div id="form-container">
                <h2>Sign in to ArtistWorks</h2>
                <p>New user? <a href="#">Create an account.</a></p>
                <form @submit.prevent="handleSubmit">
                    <FormInput id="login-username" v-model="username">Enter username</FormInput>
                    <FormInput id="login-password" v-model="password" type="password">Enter password</FormInput>
                    <button :disabled="!cancontinue">Continue</button>
                </form>
                <p><a href="#">Forgot password?</a></p>

                <span class="hr-span">Or sign up with</span>
                <!-- GOOGLE | APPLE -->
            </div>
        </div>
    </div>
</template>

<style scoped>

#sign-in-page {
    height: 100vh;
}
#effect {
    display:none;
    color:#FFF;
    padding:20px;
}
#form-cell {
    display: flex;
    justify-content: center;
}
#form-container {
    min-width: 500px;
}

.hr-span {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.hr-span::before,
.hr-span::after {
    content:"";
    display: block;
    height:1px;
    background-color:gray;
    flex-grow: 1;
}

button {
    border-radius: 100vw;
    color:#FFF;
    background-color: var(--button-blue);
    width:100%
}

@media screen and (min-width:780px) {
    #sign-in-page {
        display: grid;
        grid-template-columns: 400px 1fr;
    }    
    #effect{
        background-color: var(--side-blue);
        display: block;
    }
}
</style>