<script setup>
import { onMounted } from "vue";
import * as monaco from "monaco-editor";
import { customLogLangDark } from "../plugin/heightlight";

onMounted(() => {
    // Define Editor Theme
    monaco.editor.defineTheme("logThemeLight", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
            "editor.background": "#FFFFFF",
            "editor.lineHighlightBackground": "#EEEEEE",
        },
    });
    monaco.editor.defineTheme("logThemeDark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
            "editor.background": "#282C34",
            "editor.lineHighlightBackground": "#2C313C",
        },
    });
    // Regist Language
    monaco.languages.register({ id: "logDark" });
    monaco.languages.setMonarchTokensProvider("logDark", customLogLangDark);
    // Create Editor
    const editor = monaco.editor.create(document.getElementById("editor"), {
        theme: "logThemeDark",
        language: "logDark",
    });
    window.addEventListener("resize", function () {
        editor.layout();
    });
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    const changeTheme = (e) => {
        if (e.matches) {
            editor.updateOptions({ theme: "logThemeDark" });
        } else {
            editor.updateOptions({ theme: "logThemeLight" });
        }
    };
    matcher.addEventListener("change", changeTheme);
    changeTheme(matcher);
    // File Handle
    const fileHandler = (fileObj) => {
        if (fileObj instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => {
                editor.setValue(e.target.result);
            };
            reader.readAsText(fileObj);
        } else {
            editor.setValue(fileObj);
        }
    };
    document
        .getElementById("fileInput")
        .addEventListener("change", function () {
            var selectedFile = this.files[0];
            if (selectedFile) {
                fileHandler(selectedFile);
            } else {
                fileHandler("");
            }
        });
});
</script>

<template>
    <div id="editor"></div>
</template>

<style>
div#editor {
    width: 100%;
    height: 100%;
}
</style>
