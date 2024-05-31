<script setup>
import { reactive } from "vue";
import hljs from "highlight.js";
import { highlightRule } from "../plugin/highlight-rule";
import DataBoard from "./DataBoard.vue";
import CodeEditor from "./code/CodeEditor.vue";
import { parseLog } from "../plugin/log-parser";

const config = reactive({
    value: "",
    data: [false, null, null, null, null],
    theme: "",
});

hljs.registerLanguage("log", highlightRule);

// File Handler
const fileHandler = (fileObj) => {
    if (fileObj instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            config.value = e.target.result;
            config.data = parseLog(e.target.result)
        };
        reader.readAsText(fileObj);
    } else {
        config.value = "";
        config.data = [false, null, null, null, null]
    }
};
document.getElementById("fileInput").addEventListener("change", function () {
    var selectedFile = this.files[0];
    if (selectedFile) {
        fileHandler(selectedFile);
    } else {
        fileHandler("");
    }
});

// Theme Handler
const matchTheme = (e) => {
    if (e.matches) {
        config.theme = "atom-one-dark";
    } else {
        config.theme = "atom-one-light";
    }
};
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", matchTheme);
matchTheme(window.matchMedia("(prefers-color-scheme: dark)"));
</script>

<template>
    <DataBoard v-model="config.data" />
    <CodeEditor
        v-model="config.value"
        :theme="config.theme"
        :read-only="true"
        :line-nums="true"
        :copy-code="false"
        :languages="[['log', '日志']]"
        width="100%"
        height="80%"
        border-radius="0" />
</template>

<style scoped lang="less">
.code-editor{
    border-top: 1px solid var(--color-border2);
}
</style>
