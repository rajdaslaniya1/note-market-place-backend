const { SystemConfigurationsKey } = require("../utils/common");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const { createSystemConfigurationSchema } = require("../utils/validation");

const SystemConfigurations = require("../db/models/index").SystemConfigurations;

const getSystemConfiguration = async (req, res) => {
  try {
    const data = await SystemConfigurations.findAll({
      where: { isActive: true },
    });
    return sendSuccessResponse(res, data, "System configuration data");
  } catch (error) {
    console.log("getSystemConfiguration-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const createSystemConfiguration = async (req, res) => {
  try {
    const { error } = createSystemConfigurationSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }
    const keysValue = req.body;
    const { user_id } = req.headers;
    for (const iterator of keysValue) {
      const existingKeyValue = await SystemConfigurations.findOne({
        where: { dataKey: iterator.dataKey },
      });
      if (existingKeyValue) {
        await SystemConfigurations.update(
          {
            dataValue: iterator.dataValue,
            updatedBy: user_id,
            dataKey: iterator.dataKey,
            isActive: true,
          },
          { where: { id: existingKeyValue.id } }
        );
      } else {
        await SystemConfigurations.create({
          dataKey: iterator.dataKey,
          dataValue: iterator.dataValue,
          createdBy: user_id,
          updatedBy: user_id,
        });
      }
    }
    // const data = await SystemConfigurations.
    return sendSuccessResponse(res, null, "Data created successfully");
  } catch (error) {
    console.log("createSystemConfiguration-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

module.exports = { getSystemConfiguration, createSystemConfiguration };
