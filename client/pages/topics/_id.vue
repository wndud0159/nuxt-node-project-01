<template>
    <div class="pt-20">
        <div class="flex space-x-10 border-b py-5 px-5">
            <nuxt-link
                :class="[$route.params.id === item.slug ? 'font-bold' : '']"
                :to="{
                    name: 'topics-id',
                    params: {
                        id: item.slug
                    }
                }"
                v-for="item in boardList"
                :key="item._id"
            >
                <div>{{ item.title }}</div>
            </nuxt-link>
        </div>
        <div class="flex flex-wrap">
            <GlobalArticleCard
                class="w-6/12"
                v-for="item in articleList"
                :key="item._id"
                :articleList="item"
                :padding="item.padding"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            boardList: [],
            articleList: [],
            pl: "border-l",
            pr: "border-r"
        };
    },
    created() {
        this.onBoardList();
        this.onBoardArticleList();
    },
    methods: {
        async onBoardList() {
            const response = await this.$api.get("/board/list");
            this.boardList = response.data;
        },
        async onBoardArticleList() {
            const response = await this.$api.get(
                `/board/${this.$route.params.id}`
            );
            this.articleList = response.data.article;

            for (let index = 0; index < this.articleList.length; index++) {
                if (index === 0) {
                    this.articleList[index]["padding"] = this.pr;
                } else if (index % 2 === 0) {
                    this.articleList[index]["padding"] = this.pr;
                }
            }
            console.log(this.articleList);
        }
    }
};
</script>

<style></style>
