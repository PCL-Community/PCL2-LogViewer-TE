function highlightRule(hljs) {
    return {
        contains: [
            {
                className: "timestamp",
                begin: /\d{2}:\d{2}:\d{2}\.\d{3}/,
                relevance: 10,
            },
            {
                className: "category",
                begin: /(?<=\[)(Start|UI|Loader|System|Animation|Launch|Page|Java|Minecraft|Net|Control|Server|Report|Download|Skin)(?=\])/,
                relevance: 10,
            },
            {
                className: "version",
                begin: /(Release|Snapshot|Debug) 2\.\d\.\d \(\d+\)/,
                relevance: 10,
            },
            {
                className: "idencode",
                begin: /[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}/,
                relevance: 10,
            },
            {
                className: "hash",
                begin: /[a-fA-F0-9]{40}/,
                relevance: 10,
            },
            {
                className: "uuid",
                begin: /([a-fA-F0-9]{32}|[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/,
                relevance: 10,
            },
            {
                className: "number",
                begin: /-?(\d{1,3})(,\d{3})*(\.\d+)?( ms|ms|%)?/,
                relevance: 10,
            },
            {
                className: "url",
                begin: /\b((http|https|ftp):\/\/)?((([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/[^\s]*)?\b(\/|\\)?/,
                relevance: 10,
            },
            {
                className: "path",
                begin: /\b[A-Z]\:(\/|\\)?([a-zA-Z0-9_ \-\.\+]+(\/|\\)?)*\b(\/|\\)?/,
                relevance: 10,
            },
        ],
    };
}

export { highlightRule };
