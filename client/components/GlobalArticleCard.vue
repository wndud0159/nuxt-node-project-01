<template>
    <div :class="`pt-4 py-3 px-3  ${padding} border-b border-gray-200`">
        <div class="flex justify-between items-center py-3 ">
            <div class="text-xl font-bold flex items-center">
                <div>{{ articleList.title }}</div>
            </div>
        </div>
        <div class="flex justify-between items-center py-1">
            <div class="font-semibold">{{ articleList.content }}</div>
            <div>
                <div v-if="articleList.articleImgAddress">
                    <img
                        :src="
                            `https://amazon-web-service-practice-with-juyoung.s3.amazonaws.com/${articleList.articleImgAddress}`
                        "
                        alt=""
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        padding: {
            type: String,
            required: true
        },
        articleList: {
            type: Object,
            default: []
        }
    }
};
</script>

<style></style>
