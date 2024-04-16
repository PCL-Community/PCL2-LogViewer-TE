const countOccurrences = (str: string, char: string) => {
    const charArray = str.split("");
    const occurrences = charArray.filter((c) => c === char).length;
    return occurrences;
};

const splitingLogFileContent = (content: String) => {
    const lines = content.split("\n");
    const data = [];
    let i = 0;
    let errmessage = [];
    while (i < lines.length) {
        const line = lines[i];
        switch (countOccurrences(line, "]")) {
            case 2:
                // If Has Error Message
                if (errmessage.length !== 0) {
                    if (errmessage[0] === "0") {
                        const [time, _type, _message] =
                            errmessage[1].split("]");
                        const message = errmessage.join("");
                        data.push({
                            key: data.length + 1,
                            time: time.replace("[", ""),
                            type: "Error",
                            message: message.substring(1, message.length - 2),
                        });
                    } else if (errmessage[0] === "1") {
                        const [time, type, _message] = errmessage[1].split("]");
                        const message = errmessage.join("");
                        data.push({
                            key: data.length + 1,
                            time: time.replace("[", ""),
                            type: type,
                            message: message.substring(1, message.length),
                        });
                    }
                    errmessage = []; // Clear Error Message
                }
                // If Error Popout Logged
                if (line.includes("普通弹窗：出现错误")) {
                    errmessage.push("1");
                    errmessage.push(line + "\n");
                }
                // Normal Line
                const [time, type, message] = line.split("]");
                data.push({
                    key: data.length + 1,
                    time: time.replace("[", ""),
                    type: type.replace("[", "").replace(" ", ""),
                    message: message
                        .replace("\r\n", "")
                        .replace("\r", "")
                        .replace(" ", ""),
                });
                i++;
                break;
            case 1:
            case 0:
                // Error Catch
                if (errmessage.length === 0) errmessage.push("0");
                errmessage.push(line + "\n");
                i++;
                break;
        }
    }
    return data;
};

const splitingVersionLine = (versionLine: string) => {
    const [_, version] = versionLine.split("：");
    const [versionMain, versionId] = version.split("（");
    return [versionMain, versionId.replace("）", "")];
};

const getErrorCount = (data: any) => {
    let errcount = 0;
    for (let i = 0; i < data.length; i++) {
        // Todo: fix type warning
        // @ts-ignore
        if (data[i].type === "Error") {
            errcount++;
        }
    }
    return errcount;
};

const convertLogFileTextToList = (text: string) => {
    const lines: string[] = text.split('\r\n');
    return lines
}

export {
    splitingLogFileContent,
    splitingVersionLine,
    getErrorCount,
    convertLogFileTextToList,
};
