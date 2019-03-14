<template>
    <div class="login-form">
        <h2 class="cabecalho">Login</h2>
        <form action="#" @submit.prevent="login">

            <div class="form-control">
                <label for="email">Email</label>
                <input type="email" name="username" id="username" class="login-input" v-model="username">
            </div>
            <br>
            <div class="fomr=-control mb-more">
                <label for="password">password</label>
                <input type="password" name="password" id="password" class="login-input" v-model="password">
            </div>
            <br>
            <div class="form-control">
                <button type="submit" class="btn-submit">Login</button>
            </div>

        </form>

    </div>

</template>

<script>
export default {}
</script>
