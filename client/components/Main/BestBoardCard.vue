<template>
    <div class="pt-4">
        <div
            class="flex justify-between items-center py-3 border-b border-gray-300"
        >
            <div class="text-xl font-bold flex items-center space-x-3">
                <i class="fas fa-crown"></i>
                <div>토픽 베스트</div>
            </div>
            <div class="text-sm text-gray-500">더보기 ></div>
        </div>
        <div
            class="flex justify-between items-center py-1"
            v-for="item in articleList"
            :key="item._id"
        >
            <div class="flex space-x-3 items-center">
                <div class="text-sm border border-gray-300 px-1">
                    {{ boardList[item.board] }}
                </div>
                <div class="font-semibold">{{ item.title }}</div>
            </div>
            <div class="flex space-x-8">
                <i class="far fa-thumbs-up text-gray-500 text-sm">1</i>
                <i class="far fa-comment text-gray-500 text-sm">10</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        articleList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            boardList: {}
        };
    },
    created() {
        this.onBoardList();
    },
    methods: {
        async onBoardList() {
            const response = await this.$api.get("/board/list");
            if (!Array.isArray(response.data)) {
                return;
            }
            response.data.forEach(v => {
                this.boardList[v._id] = v.title;
            });
        }
    }
};
</script>

<style></style>
