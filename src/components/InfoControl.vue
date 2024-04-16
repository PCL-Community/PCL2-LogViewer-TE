<script setup lang="ts">
// @ts-ignore
const name = "InfoControl";
// @ts-ignore
const props = defineProps({
    pclversion: String,
    pclversionid: String,
    pclerrorcount: Number,
});
</script>

<template>
    <div id="InfoControl">
        <div class="InfoItem">
            <a-typography-title :heading="4">
                PCL 启动器版本
            </a-typography-title>
            <a-typography-text type="secondary" class="ItemTextSecond">
                {{ props.pclversion }}
            </a-typography-text>
        </div>
        <div class="InfoItem">
            <a-typography-title :heading="4"> 版本识别号 </a-typography-title>
            <a-typography-text type="secondary" class="ItemTextSecond">
                {{ props.pclversionid }}
            </a-typography-text>
        </div>
        <div class="InfoItem">
            <a-typography-title :heading="4"> 错误记录数量 </a-typography-title>
            <a-typography-text type="secondary" class="ItemTextSecond">
                {{ props.pclerrorcount }} 条
            </a-typography-text>
        </div>
    </div>
</template>

<style scoped lang="less">
div#InfoControl {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    div.InfoItem {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-right: 15px;
        gap: 5px;
        span.ItemTextSecond {
            transform: translateX(15px);
        }
    }
}

h4.arco-typography {
    margin: 0;
}
</style>
