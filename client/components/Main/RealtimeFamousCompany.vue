<template>
    <div class="flex flex-col items-start bg-gray-100 px-7 py-3">
        <div class="text-xl font-bold">실시간 인기 회사</div>
        <div
            class="flex flex-col bg-gray-100 w-full"
            v-for="(item, index) in famousCompanyList"
            :key="index"
        >
            <div>{{ index + 1 }} {{ item.title }}</div>
        </div>
        <div class=" text-xs text-gray-500 py-5">
            블라인드에서 실시간으로 많이 검색된 회사 순위
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            famousCompanyList: []
        };
    },
    created() {
        this.onRealtimeFamousCompany();
    },
    methods: {
        async onRealtimeFamousCompany() {
            const response = await this.$api.get("/company/list/famous");
            this.famousCompanyList = response.data;
        }
    }
};
</script>

<style></style>
