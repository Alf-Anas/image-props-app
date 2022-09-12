export const initialHeader = {
    id: "",
    FileName: "",
    FileType: "",
    ImageWidth: "",
    ImageHeight: "",
    Make: "",
    Model: "",
    Orientation: "",
    XResolution: "",
    YResolution: "",
    ResolutionUnit: "",
    Software: "",
    ModifyDate: "",
    YCbCrPositioning: "",
    ExposureTime: "",
    FNumber: "",
    ExposureProgram: "",
    ISO: "",
    ExifVersion: "",
    DateTimeOriginal: "",
    CreateDate: "",
    OffsetTime: "",
    OffsetTimeOriginal: "",
    ShutterSpeedValue: "",
    ApertureValue: "",
    BrightnessValue: "",
    ExposureCompensation: "",
    MaxApertureValue: "",
    MeteringMode: "",
    Flash: "",
    FocalLength: "",
    ColorSpace: "",
    ExifImageWidth: "",
    ExifImageHeight: "",
    ExposureMode: "",
    WhiteBalance: "",
    DigitalZoomRatio: "",
    FocalLengthIn35mmFormat: "",
    SceneCaptureType: "",
    ImageUniqueID: "",
    GPSLatitudeRef: "",
    GPSLatitude: "",
    GPSLongitudeRef: "",
    GPSLongitude: "",
    GPSAltitudeRef: "",
    GPSAltitude: "",
    latitude: "",
    longitude: "",
};

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
