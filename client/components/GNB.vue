<template>
    <div
        class="flex w-full fixed items-center border-b py-3 pr-5 z-10 bg-white"
    >
        <div class="flex items-center justify-start space-x-5 flex-1">
            <nuxt-link to="/">
                <img src="/logo/main.png" alt="" />
            </nuxt-link>
            <nuxt-link
                :class="[$route.name === 'index' ? 'font-bold' : '']"
                to="/"
            >
                홈
            </nuxt-link>
            <nuxt-link
                to="/company"
                :class="[$route.name === 'company' ? 'font-bold' : '']"
            >
                기업리뷰
            </nuxt-link>
        </div>
        <div class="flex justify-end space-x-3 w-8/12">
            <SmallSearchbar />
            <button
                class="border text-white px-4 py-1 bg-red-500"
                @click.prevent="clickWritingButton"
            >
                글쓰기
            </button>
            <button
                class="border font-semibold px-4 py-2"
                @click.prevent="clickLoginButton"
            >
                {{ user.email ? "로그아웃" : "로그인" }}
            </button>
        </div>
        <LoginModal />
        <WritingModal />
    </div>
</template>

<script>
import LoginModal from "@/components/Modal/Login";
import WritingModal from "@/components/Modal/Writing";
import SmallSearchbar from "@/components/GNB/SmallSearchbar";
export default {
    components: {
        LoginModal,
        WritingModal,
        SmallSearchbar
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        clickWritingButton() {
            if (!this.user.email) {
                this.$store.commit("modal/SET_LOGIN_MODAL_OPEN");
            }
        },
        clickLoginButton() {
            if (!this.user.email) {
                this.$store.commit("modal/SET_LOGIN_MODAL_OPEN");
            } else {
                this.$store.commit("user/SET_USER", {
                    email: null,
                    nickname: null
                });
            }
        },
        clickWritingButton() {
            if (!this.user.email) {
                this.$store.commit("modal/SET_LOGIN_MODAL_OPEN");
            } else {
                this.$store.commit("modal/SET_WRITING_MODAL_STATE", true);
            }
        }
    }
};
</script>

<style></style>
