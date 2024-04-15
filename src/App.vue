<script setup lang="ts">
import { ref, reactive } from "vue";
// Icon
import { IconExclamationCircleFill } from "@arco-design/web-vue/es/icon";

// @ts-ignore
const name = "App";
// @ts-ignore
const components = {
    // Icon
    IconExclamationCircleFill,
};

const logFileContent = ref("");

const status = reactive({
    isLogFileLoaded: false,
    isLoadLogButtonDisabled: false,
    isUnloadLogButtonDisabled: true,
});

const handleLoadingLogFile = () => {
    const logFileEl = document.querySelector(
        "input#logFileInput"
    ) as HTMLInputElement;
    logFileEl.addEventListener("change", (event) => {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                // @ts-ignore
                const fileContent = event.target.result as string;
                logFileContent.value = fileContent;
                // Loading End
                status.isLogFileLoaded = true;
                status.isLoadLogButtonDisabled = true;
                setTimeout(() => {
                    status.isUnloadLogButtonDisabled = false;
                }, 1000);
            };
            reader.readAsText(file);
        }
    });
    // Trigger File Input
    logFileEl.click();
};


const handleUnloadingLogFile = () => {
    status.isLogFileLoaded = false;
    status.isLoadLogButtonDisabled = false;
    status.isUnloadLogButtonDisabled = true;
};
</script>

<template>
    <input
        type="file"
        id="logFileInput"
        style="display: none"
        accept=".txt"
        title="日志文件(Log*.txt)" />
    <div class="container">
        <a-card id="configCard">
            <div id="mainFlex">
                <a-space direction="vertical">
                    <a-button
                        type="outline"
                        :disabled="status.isLoadLogButtonDisabled"
                        @click="handleLoadingLogFile()">
                        打开日志
                    </a-button>
                    <a-button
                        type="outline"
                        status="danger"
                        :disabled="status.isUnloadLogButtonDisabled"
                        @click="handleUnloadingLogFile()">
                        关闭日志
                    </a-button>
                </a-space>
                <div id="infoFlex">
                    <a-empty v-if="!status.isLogFileLoaded">
                        <template #image>
                            <icon-exclamation-circle-fill />
                        </template>
                        请先加载日志
                    </a-empty>
                </div>
            </div>
        </a-card>
        <a-card id="mainCard"></a-card>
        <a-card id="errorCard"></a-card>
    </div>
</template>

<style scoped lang="less">
div.container {
    width: calc(100% - 40px);
    height: calc(100vh - 40px);
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 127px 1fr;
    grid-template-areas:
        "configCard"
        "mainCard";
    column-gap: 10px;
    row-gap: 10px;
    div#errorCard {
        display: none;
    }
    div#mainFlex {
        display: flex;
        gap: 10px;
        align-items: center;
        height: 91.7px;
        div#infoFlex {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    }
}

@media screen and (min-width: 1300px) {
    div.container {
        grid-template-columns: 2.5fr 1fr;
        grid-template-rows: 127px 1fr;
        grid-template-areas:
            "configCard configCard"
            "mainCard errorCard";
        div#configCard {
            grid-area: configCard;
        }
        div#mainCard {
            grid-area: mainCard;
        }
        div#errorCard {
            display: block;
            grid-area: errorCard;
        }
    }
}
</style>
