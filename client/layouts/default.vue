<template>
    <div class="">
        <Nuxt />
    </div>
</template>

<script>
export default {
    created() {
        console.log("created check");
        this.initLogin();
    },
    methods: {
        async initLogin() {
            console.log("initLogin fn check");
            if (process.browser) {
                const token = localStorage.getItem("token");
                const response = await this.$api.get("/user/token");
                if (response.data.error) {
                    return;
                }
                this.$store.commit("user/SET_USER", {
                    email: response.data.email,
                    nickname: response.data.nickname,
                    token: token
                });
            }
        }
    }
};
</script>

<style></style>
