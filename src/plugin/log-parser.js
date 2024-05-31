export const parseLog = (log) => {
    const versionPattern =
        /(Release|Snapshot|Debug|Dev) \d\.\d\.\d (\(|\uFF08)\d+(\)|\uFF09)/;
    const errorPattern = /错误类型：[^\d_]+\.[^\d_]+\.[^\d_]+/g;
    // Parse
    let version, type, ver;
    try {
        version = log.match(versionPattern)[0];
        [type, ver] = version.split(" ");
    } catch {
        type = null;
        ver = null;
    }
    const long = log.split("\n").length;
    let match,
        count = 0;
    while ((match = errorPattern.exec(log)) !== null) {
        count++;
    }
    return [
        true,
        type ? type : "Unknown",
        ver ? ver : "Unknown",
        long ? long : "-",
        count ? count : "-",
    ];
};
