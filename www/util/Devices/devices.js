const {getUnknownDeviceHistoryByDevice} = require("../../model/mongodb");


async function handleMissingModel(item) {
    if (item.model == null) {
        var deviceType = "";
        var brand = "";
        var model = "";
        const customModel = await getUnknownDeviceHistoryByDevice(item._id);
        if (customModel.length > 0 && customModel[0].data) {
            customModel[0].data.forEach(data => {
                if (data.name === "device_type") {
                    deviceType = data.value;
                } else if (data.name === "brand") {
                    brand = data.value;
                } else if (data.name === "model") {
                    model = data.value;
                }
            });
        } else {
            deviceType = "MISSING TYPE";
            brand = "MISSING BRAND";
            model = "MISSING MODEL";
        }
        item.device_type = { name: deviceType };
        item.brand = { name: brand };
        item.model = { name: model };
    }

    return item;
}
async function handleMissingModels(devices) {
    //Create a promise that resolves once every device has been handled
    const promises = devices.map(device => {
        return handleMissingModel(device);
    });
    return Promise.all(promises);
}

module.exports = {
    handleMissingModel,
    handleMissingModels,
}