export const saveDataCSV = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (fileName, csvData) {
        const csv = csvData,
            blob = new Blob([csv], { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName + ".csv";
        a.click();
        window.URL.revokeObjectURL(url);
    };
})();
