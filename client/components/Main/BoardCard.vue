<template>
    <div :class="`pt-4 ${padding}`">
        <div
            class="flex justify-between items-center py-3 border-b border-gray-300"
        >
            <div class="text-xl font-bold flex items-center">
                <div>{{ title }}</div>
            </div>
            <nuxt-link :to="`topics/${slug}`" class="text-sm text-gray-500"
                >더보기 ></nuxt-link
            >
        </div>
        <div
            class="flex justify-between items-center py-1"
            v-for="item in articleList"
            :key="item._id"
        >
            <div class="font-semibold">{{ item.title }}</div>
            <i class="far fa-eye text-gray-500 text-sm">10</i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        padding: {
            type: String,
            required: true
        },
        articleList: {
            type: Array,
            default: []
        }
    }
};
</script>

<style></style>
