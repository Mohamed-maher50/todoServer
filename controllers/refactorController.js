const expressAsyncHandler = require("express-async-handler");
const { NotFoundDocument, FORBIDDEN } = require("../constants/ErrorsType");
const ErrorHandler = require("../utils/ErrorHandler");

module.exports.FindByIdAndDelete = (Model) => {
  return expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document)
      return next(
        new ErrorHandler(NotFoundDocument, "not found document", 404)
      );
    if (document.user != req.user.id)
      return next(
        new ErrorHandler(FORBIDDEN, "can't delete this document", 403)
      );
    await document.deleteOne();
    res.sendStatus(204);
  });
};
module.exports.updateOne = (Model) => {
  return expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const filtration = req.filtration || {};
    const document = await Model.findOneAndUpdate(
      {
        _id: id,
        ...filtration,
      },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!document)
      return next(
        new ErrorHandler(NotFoundDocument, "not found document", 404)
      );
    res.status(200).json({
      data: document,
    });
  });
};
