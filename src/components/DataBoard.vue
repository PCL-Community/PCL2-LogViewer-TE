<script setup>
import { ElRow, ElCol, ElStatistic, ElIcon, ElTooltip } from "element-plus";
import { QuestionFilled } from "@element-plus/icons-vue";
import { reactive } from "vue";

const config = reactive({
    theme: "dark",
});

const props = defineProps({
    modelValue: String,
});

// Theme Handler
const matchTheme = (e) => {
    if (e.matches) {
        config.theme = "dark";
    } else {
        config.theme = "light";
    }
};
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", matchTheme);
matchTheme(window.matchMedia("(prefers-color-scheme: dark)"));
</script>

<template>
    <div class="databoard">
        <ElRow
            style="height: 100%; display: flex; align-items: center"
            v-if="!props.modelValue[0]">
            <ElCol :span="24">
                <span class="need-load">请先加载一个日志文件</span>
            </ElCol>
        </ElRow>
        <ElRow
            style="height: 100%; display: flex; align-items: center"
            v-if="props.modelValue[0]">
            <ElCol :span="6">
                <ElStatistic title="启动器类型" :value="props.modelValue[1]" />
            </ElCol>
            <ElCol :span="6">
                <ElStatistic title="启动器版本" :value="props.modelValue[2]" />
            </ElCol>
            <ElCol :span="6">
                <ElStatistic title="日志长度" :value="props.modelValue[3]">
                    <template #suffix>
                        <span style="font-size: 0.6em;">行</span>
                    </template>
                </ElStatistic>
            </ElCol>
            <ElCol :span="6">
                <ElStatistic title="错误数量" :value="props.modelValue[4]">
                    <!-- <template #suffix>
                        <ElTooltip
                            class="box-item"
                            :effect="config.theme"
                            content="点击查看详情"
                            placement="right">
                            <ElIcon
                                :size="14"
                                style="vertical-align: -0.125em">
                                <QuestionFilled />
                            </ElIcon>
                        </ElTooltip>
                    </template> -->
                    <template #suffix>
                        <span style="font-size: 0.6em;">个</span>
                    </template>
                </ElStatistic>
            </ElCol>
        </ElRow>
    </div>
</template>

<style scoped lang="less">
div.databoard {
    height: 13%;
    border: 3px solid var(--color-border2);
    margin: 40px;
    border-radius: 20px;
}

.need-load {
    font-size: 1.7em;
    letter-spacing: 1em;
}

.el-col {
    text-align: center;
}
</style>
