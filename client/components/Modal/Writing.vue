<template>
    <form
        @submit="uploadArticle()"
        class="fixed h-screen  inset-0 w-full z-30  flex justify-center items-center"
        v-if="writing"
    >
        <div class="fixed inset-0">
            <div class="absolute inset-0 bg-black opacity-75"></div>
        </div>
        <div class="bg-white w-8/12  z-50">
            <div class="bg-white">
                <div
                    class="flex justify-between py-3 px-3 items-center border-b border-gray-300"
                >
                    <i
                        @click.prevent="closeWritingModal()"
                        class="fas fa-times text-xl"
                    ></i>
                    <div class="font-semibold">글쓰기</div>
                    <button type="submit" class=" text-lg font-bold">
                        등록
                    </button>
                </div>
                <div class=" relative">
                    <div
                        class=" flex justify-between items-center px-3 py-5 border-b border-gray-300"
                        @click.prevent="isBoardSelected = !isBoardSelected"
                    >
                        <div>
                            {{ boardList[currentSelectBoard].title }}
                        </div>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div
                        class="absolute top-15 w-full z-30 bg-white"
                        v-if="isBoardSelected"
                    >
                        <div
                            class="py-3 px-3 border-b border-gray-300"
                            @click.prevent="clickBoard(index)"
                            v-for="(item, index) in boardList"
                            :key="index"
                        >
                            {{ item.title }}
                        </div>
                    </div>
                </div>
                <div class="mx-10 py-5 border-b border-gray-300">
                    <input
                        class=" outline-none text-2xl font-semibold w-full"
                        type="text"
                        required
                        v-model="title"
                        placeholder="제목을 입력해주세요."
                    />
                </div>
                <div class="mx-10 py-5">
                    <textarea
                        class=" resize-none outline-none font-semibold w-full"
                        placeholder="토픽에 맞지 않는 글로 판단되어 다른 유저로부터 일정 수 이상의 신고를 받는 경우 글이 자동으로 숨김처리 될 수 있습니다."
                        v-model="content"
                        rows="10"
                        required
                    ></textarea>
                </div>
                <div class="flex text-2xl px-3 py-3 bg-gray-300 space-x-5">
                    <i class="fas fa-camera" @click="$refs.img.click()"></i>
                    <i class="fas fa-chart-bar"></i>
                    <i class="fas fa-at"></i>
                    <i class="fas fa-hashtag"></i>
                    <input
                        class=" hidden"
                        type="file"
                        ref="img"
                        @change="uploadImage"
                    />
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    computed: {
        writing() {
            return this.$store.state.modal.writing;
        }
    },

    data() {
        return {
            boardList: [],
            currentSelectBoard: 0,
            isBoardSelected: false,
            title: null,
            content: null,
            imgFile: null
        };
    },
    created() {
        this.onBoardList();
    },
    methods: {
        async onBoardList() {
            const response = await this.$api.get("board/list");
            if (!Array.isArray(response.data)) {
                return;
            }
            this.boardList = response.data;
            console.log(this.boardList);
        },
        clickBoard(index) {
            this.currentSelectBoard = index;
            this.isBoardSelected = !this.isBoardSelected;
        },

        async uploadArticle() {
            const response = await this.$api.post("/article/create", {
                title: this.title,
                content: this.content,
                board: this.boardList[this.currentSelectBoard]._id,
                image: this.imgFile
            });
            this.closeWritingModal();
        },
        closeWritingModal() {
            this.$store.commit("modal/SET_WRITING_MODAL_STATE", false);
        },
        async uploadImage() {
            let formdata = new FormData();
            let file = this.$refs.img.files[0];
            formdata.append("file", file);
            setTimeout(async () => {
                const response = await this.$api.post("/upload", formdata);
                console.log("image response : ", response);
                this.imgFile = response.data.key;
            }, 300);
        }
    }
};
</script>

<style></style>
