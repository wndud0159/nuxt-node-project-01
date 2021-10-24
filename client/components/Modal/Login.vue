<template>
    <div
        class=" fixed h-screen  w-full inset-0 flex justify-center items-center"
        v-if="login.show"
    >
        <div class="fixed inset-0">
            <div class="absolute inset-0 bg-black opacity-75"></div>
        </div>
        <div class="bg-white w-8/12 z-30">
            <div class="w-full relative">
                <i
                    @click.prevent="onCloseModal()"
                    class="fas fa-times absolute top-3 right-4 text-lg"
                ></i>
                <div
                    class="border-b border-gray-200 px-3 py-3 font-bold text-xl"
                >
                    {{
                        login.directLogin ? "로그인" : "블라인드 OTP 안전 인증"
                    }}
                </div>
                <div v-if="!login.directLogin" class="px-3 py-3">
                    <div class="font-semibold">
                        블라인드 앱의 마이페이지 > 블라인드 웹 로그인 메뉴에서
                        아래 생성된 일회용 인증코드 8자리를 입력하시면 웹에서도
                        모든 기능을 이용할 수 있습니다.
                    </div>
                    <div class=" text-sm text-gray-500 py-3">블라인드 OTP</div>
                    <button class=" bg-primary text-white w-full py-3 text-4xl">
                        U - 460 - 6051
                    </button>
                    <div class="text-center text-primary mt-3">
                        남은시간 : {{ displayTime }}
                    </div>
                    <button
                        @click.prevent="
                            $store.commit('modal/SET_LOGIN_MODAL_DIRECT_LOGIN')
                        "
                        class=" w-full text-center py-3 underline text-gray-500"
                    >
                        블라인드에 처음이신가요?
                    </button>
                </div>
                <form
                    @submit.prevent="loginWithEmail()"
                    v-if="login.directLogin"
                    class="px-3 py-3 space-y-3"
                    action=""
                >
                    <div>
                        <label for="user-email">이메일</label><br />
                        <input
                            class=" outline-none px-2 py-2 ring-primary focus:ring ring-opacity-40 border border-gray-400 w-full"
                            type="email"
                            id="user-id"
                            required
                            v-model="email"
                        />
                    </div>
                    <div>
                        <label for="user-password">비밀번호</label><br />
                        <input
                            class=" outline-none px-2 py-2 ring-primary focus:ring ring-opacity-40 border border-gray-400 w-full"
                            type="password"
                            id="user-password"
                            required
                            v-model="password"
                        />
                    </div>
                    <button type="submit" class="primary-btn">
                        이메일로 로그인
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        login() {
            return this.$store.state.modal.login;
        }
    },
    data() {
        return {
            leftTime: 180,
            displayTime: "3분",
            email: null,
            password: null,
            intetval: setInterval(() => {
                this.timeModifier();
            }, 1000)
        };
    },
    watch: {
        "login.show": function(to, from) {
            if (to !== from && to) {
                this.leftTime = 180;
                this.setInterval;
            }
        }
    },
    created() {},
    methods: {
        timeModifier() {
            this.leftTime -= 1;
            if (this.leftTime <= 0) {
                this.leftTime = 180;
                this.displayTime = `3분`;
            } else if (this.leftTime >= 120) {
                this.displayTime = `2분 ${this.leftTime - 120}초`;
            } else if (this.leftTime >= 60) {
                this.displayTime = `1분 ${this.leftTime - 60}초`;
            } else {
                this.displayTime = `${this.leftTime}초`;
            }
        },
        onCloseModal() {
            clearInterval(this.setInterval);
            this.$store.commit("modal/SET_LOGIN_MODAL_CLOSE");
        },
        async loginWithEmail() {
            const response = await this.$axios.post("/user/login", {
                email: this.email,
                password: this.password
            });
            console.log(response.data);
            if (response.data.error) {
                return;
            }
            this.$store.commit("user/SET_USER", {
                email: response.data.email,
                nickname: response.data.nickname,
                token: response.data.token
            });
            this.onCloseModal();
        }
    }
};
</script>

<style scoped></style>
