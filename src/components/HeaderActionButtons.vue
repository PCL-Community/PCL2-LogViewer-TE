<script setup>
import { reactive } from "vue";

const args = reactive({
    isDark: Boolean,
    btnColor: String,
    btnContentColor: String,
});

const changeValue = (e) => {
    if (e.matches) {
        args.isDark = true;
        args.btnColor = "#33373B";
        args.btnContentColor = "#9DA5B4";
    } else {
        args.isDark = false;
        args.btnColor = "#D2D2D2";
        args.btnContentColor = "#000000";
    }
};

// Theme Change Hanlder
changeValue(window.matchMedia("(prefers-color-scheme: dark)"));
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => changeValue(e));

// Files
const handleChooseFile = () => {
    document.getElementById("fileInput").click();
};
</script>

<template>
    <div :style="{ '--c': args.btnContentColor }">
        <el-button
            tabindex="-1"
            :dark="args.isDark"
            :color="args.btnColor"
            plain
            @click="handleChooseFile()">
            <el-icon>打开文件</el-icon>
        </el-button>
    </div>
    <input type="file" id="fileInput" style="display: none" />
</template>

<style scoped lang="less">
.el-button {
    margin-left: 0;
    height: 25px;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    span i.el-icon {
        font-style: normal;
        color: var(--c);
        font-size: 0.8rem;
    }
    &:hover {
        background-color: var(--el-button-hover-bg-color);
    }
    &:active {
        background-color: var(--el-button-active-bg-color);
    }
    :nth-child(1) {
        width: 40px;
    }
}
</style>
