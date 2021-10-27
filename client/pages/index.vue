<template>
    <div>
        <!-- main section -->
        <div class="pt-28 flex px-5">
            <div class="w-8/12 pr-14">
                <Searchbar />
                <BestBoardCard :articleList="boardList" />
                <div class=" flex flex-wrap">
                    <BoardCard
                        class="w-6/12"
                        v-for="item in mainContent"
                        :key="item.slug"
                        :title="item.title"
                        :slug="item.slug"
                        :padding="item.padding"
                        :articleList="item.content"
                    />
                </div>
            </div>
            <div class="flex-1">
                <RealtimeFamousCompany />
            </div>
        </div>
    </div>
</template>

<script>
import BestBoardCard from "@/components/Main/BestBoardCard";
import BoardCard from "@/components/Main/BoardCard";
import RealtimeFamousCompany from "@/components/Main/RealtimeFamousCompany";
export default {
    components: {
        BestBoardCard,
        BoardCard,
        RealtimeFamousCompany
    },
    data() {
        return {
            mainContent: [],
            boardList: [],
            pl: "pl-5",
            pr: "pr-5"
        };
    },
    created() {
        this.onRecentBoardArticleList();
    },
    methods: {
        async onRecentBoardArticleList() {
            const response = await this.$api.get("/main");
            if (response.data.error) {
                return;
            }
            this.mainContent = response.data.content;
            this.boardList = this.mainContent[0].content;
            for (let index = 0; index < this.mainContent.length; index++) {
                if (index === 0) {
                    this.mainContent[index]["padding"] = this.pr;
                } else if (index === 1) {
                    this.mainContent[index]["padding"] = this.pl;
                } else if (index % 2 === 0) {
                    this.mainContent[index]["padding"] = this.pr;
                } else if (index % 3 === 0) {
                    this.mainContent[index]["padding"] = this.pl;
                }
            }
            // console.log(this.mainContent);
        }
    }
};
</script>
