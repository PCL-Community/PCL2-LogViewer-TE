<script setup lang="ts">
import { ref, reactive } from "vue";
import {
    convertLogFileTextToList,
    getErrorCount,
    splitingLogFileContent,
    splitingVersionLine,
} from "./common/ContentUtils.ts";
// Comp
import InfoControl from "./components/InfoControl.vue";
// Icon
import { IconExclamationCircleFill } from "@arco-design/web-vue/es/icon";

// @ts-ignore
const name = "App";
// @ts-ignore
const components = {
    InfoControl,
    // Icon
    IconExclamationCircleFill,
};

const logFileContent = ref("");

const status = reactive({
    isLogFileLoaded: false,
    isLoadLogButtonDisabled: false,
    isUnloadLogButtonDisabled: true,
});

const logFileResult = reactive({
    versionMain: "",
    versionId: "",
    errorcount: 0,
    raw: [""],
    height: 0,
});

// @ts-ignore
const tableColumn = [
    {
        title: "时间",
        dataIndex: "time",
        width: 120,
    },
    {
        title: "类型",
        dataIndex: "type",
        width: 120,
    },
    {
        title: "内容",
        dataIndex: "message",
    },
];

const loadData = () => {
    if (logFileContent.value == null) return;
    const data = splitingLogFileContent(logFileContent.value);
    [logFileResult.versionMain, logFileResult.versionId] = splitingVersionLine(
        data[0].message
    );
    logFileResult.errorcount = getErrorCount(data);
};

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
                logFileResult.raw = convertLogFileTextToList(fileContent);
                loadData();
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
    logFileEl.click();
};

const handleUnloadingLogFile = () => {
    status.isLogFileLoaded = false;
    status.isLoadLogButtonDisabled = false;
    status.isUnloadLogButtonDisabled = true;
    logFileResult.errorcount = 0;
    logFileResult.versionMain = "";
    logFileResult.versionId = "";
    logFileResult.raw = [];
    logFileContent.value = "";
    const logFileEl = document.querySelector(
        "input#logFileInput"
    ) as HTMLInputElement;
    logFileEl.value = "";
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
        <a-card id="ConfigCard">
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
                <div id="InfoFlex">
                    <a-empty v-if="!status.isLogFileLoaded">
                        <template #image>
                            <icon-exclamation-circle-fill />
                        </template>
                        请先加载日志
                    </a-empty>
                    <InfoControl
                        :pclversion="logFileResult.versionMain"
                        :pclversionid="logFileResult.versionId"
                        :pclerrorcount="logFileResult.errorcount"
                        v-else />
                </div>
            </div>
        </a-card>
        <a-card id="MainCard" title="日志内容">
            <div v-if="status.isLogFileLoaded">
                <p
                    v-for="(item, index) in logFileResult.raw"
                    :key="index"
                    style="white-space: pre-wrap; margin: 4px 0">
                    {{ item }}
                </p>
            </div>
        </a-card>
        <a-card id="ErrorCard" title="错误信息"></a-card>
    </div>
</template>

<style scoped lang="less">
div.container {
    width: calc(100% - 40px);
    max-width: calc(100% - 40px);
    height: calc(100vh - 40px);
    max-height: calc(100vh - 40px);
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 127px 1fr;
    grid-template-areas:
        "ConfigCard"
        "MainCard";
    column-gap: 10px;
    row-gap: 10px;
    div#ConfigCard {
        grid-area: ConfigCard;
    }
    div#MainCard {
        grid-area: MainCard;
    }
    div#ErrorCard {
        display: none;
    }
    div#mainFlex {
        display: flex;
        gap: 10px;
        align-items: center;
        height: 91.7px;
        div#InfoFlex {
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
            "ConfigCard ConfigCard"
            "MainCard ErrorCard";
        div#ConfigCard {
            grid-area: ConfigCard;
        }
        div#MainCard {
            grid-area: MainCard;
        }
        div#ErrorCard {
            display: block;
            grid-area: ErrorCard;
        }
    }
}
</style>
