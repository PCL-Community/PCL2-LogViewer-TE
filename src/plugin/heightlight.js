const customLogLangDark = {
    tokenizer: {
        root: [
            [
                /^(?:[0-1][0-9]|2[0-4]):(?:[0-5][0-9]):(?:[0-5][0-9])\.(?:\d{3})$/,
                "clock",
            ],
            [/\bStart\b/, "typeStart"],
            [/.*/, "code"],
        ],
    },
    colors: {
        clock: "#7F848E",
        typeStart: "#41B883",
        code: "#FF0000",
    },
};

export { customLogLangDark };
