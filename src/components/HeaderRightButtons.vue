<script setup>
import { reactive } from "vue";
import { invoke } from "@tauri-apps/api";
import { ElButton, ElIcon } from "element-plus";
import { Minus, FullScreen, Close } from "@element-plus/icons-vue";

const args = reactive({
    isDark: Boolean,
    btnColor: String,
    btnContentColor: String,
});

const changeValue = (e) => {
    if (e.matches) {
        args.isDark = true;
        args.btnColor = "#3F4247";
        args.btnContentColor = "#9DA5B4";
    } else {
        args.isDark = false;
        args.btnColor = "#C0C0C0";
        args.btnContentColor = "#000000";
    }
};

// Theme Change Hanlder
changeValue(window.matchMedia("(prefers-color-scheme: dark)"));
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => changeValue(e));

const handleMaximize = () => {
    invoke("maximize");
};
</script>

<template>
    <div class="ThreeButton" :style="{'--c': args.btnContentColor}">
        <el-button
            tabindex="-1"
            plain
            :dark="args.isDark"
            :color="args.btnColor"
            @click="invoke('minimize')">
            <el-icon>
                <Minus />
            </el-icon>
        </el-button>
        <el-button
            tabindex="-1"
            plain
            :dark="args.isDark"
            :color="args.btnColor"
            @click="handleMaximize()">
            <el-icon>
                <FullScreen />
            </el-icon>
        </el-button>
        <el-button
            tabindex="-1"
            plain
            :dark="args.isDark"
            color="#E81123"
            @click="invoke('close')">
            <el-icon :size="18">
                <Close />
            </el-icon>
        </el-button>
    </div>
</template>

<style scoped lang="less">
div.ThreeButton {
    .el-button {
        margin-left: 0;
        width: calc(var(--h) + 10px);
        height: var(--h);
        border: none;
        border-radius: 0;
        background-color: transparent;
        span i.el-icon svg {
            color: var(--c);
        }
        &:hover {
            background-color: var(--el-button-hover-bg-color);
        }
        &:active {
            background-color: var(--el-button-active-bg-color);
        }
        &:nth-child(3) {
            border-radius: 0 var(--br) 0 0;
            &:hover span i.el-icon svg,
            &:active span i.el-icon svg {
                color: #fff;
            }
        }
    }
}

body.maximized header .right div.ThreeButton .el-button:nth-child(3) {
    border-radius: 0;
}
</style>
