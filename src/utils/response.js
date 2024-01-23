const sendSuccessResponse = (
  res,
  data = null,
  message = "Success",
  token = null
) => {
  const response = { success: true, message, status: 200 };

  if (token) {
    response.token = token;
  }

  if (data != null) {
    response.data = data;
  }

  res.status(200).json(response);
};

const sendErrorResponse = (
  res,
  message = "Internal Server Error",
  statusCode = 500
) => {
  res.status(statusCode).json({
    success: false,
    message,
    status: statusCode,
  });
};

module.exports = { sendSuccessResponse, sendErrorResponse };
