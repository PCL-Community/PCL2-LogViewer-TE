<script setup>
import Logo from "./Icons/Logo.vue";
import HeaderActionButtons from "./HeaderActionButtons.vue";
import HeaderRightButtons from "./HeaderRightButtons.vue";
import packageJson from "../../package.json";
</script>

<template>
    <header>
        <div class="left">
            <Logo />
            <span>
                <span>PCL2 日志查看器</span>
                <span style="font-size: 0.5em; margin-left: 4px">
                    v{{ packageJson.version }}
                </span>
            </span>
        </div>
        <div class="action">
            <HeaderActionButtons/>
        </div>
        <div class="right">
            <HeaderRightButtons />
        </div>
    </header>
</template>

<style scoped lang="less">
header {
    background-color: var(--color-bg-o);
    --h: 40px;
    width: 100%;
    height: var(--h);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .left {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        span {
            transform: translateY(-2px);
        }
    }
    .action {
        border-left: 1px solid var(--color-border);
        padding-left: 12px;
        margin-left: 12px;
    }
    .right {
        height: var(--h);
        margin-left: auto;
    }
}
</style>
