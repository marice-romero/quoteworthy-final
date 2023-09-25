const Quote = require("../models/Quote");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllQuotes = async (req, res) => {
  const { search, sourceType, favorite, sort, tag } = req.query;
  const searchTerm = search || "";

  const queryObject = {};
  queryObject.createdBy = req.user.userId;

  if (sourceType) {
    queryObject.sourceType = sourceType;
  }
  if (favorite) {
    queryObject.favorite = favorite === "true" ? true : false;
  }
  if (tag) {
    queryObject.tags = tag;
  }

  let result = Quote.find({
    $and: [
      queryObject,
      {
        $or: [
          { quoteText: { $regex: searchTerm, $options: "i" } },
          { source: { $regex: searchTerm, $options: "i" } },
        ],
      },
    ],
  });

  // sort
  if (sort) {
    // const sortList = sort.split(",").join(" ");
    if (sort === "newest") {
      result = result.sort({ createdAt: -1 });
    } else {
      result = result.sort(sort);
    }
  } else {
    result = result.sort("createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const quotes = await result;
  const total = await Quote.countDocuments({
    $and: [
      queryObject,
      {
        $or: [
          { quoteText: { $regex: searchTerm, $options: "i" } },
          { source: { $regex: searchTerm, $options: "i" } },
        ],
      },
    ],
  });

  res.status(StatusCodes.OK).json({ quotes, count: total });
};

const getQuote = async (req, res) => {
  const {
    user: { userId },
    params: { id: quoteId },
  } = req;

  const quote = await Quote.findOne({
    _id: quoteId,
    createdBy: userId,
  });

  if (!quote) {
    throw new NotFoundError(`No quote with id ${quoteId}`);
  }

  res.status(StatusCodes.OK).json({ quote });
};

const createQuote = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const quote = await Quote.create(req.body);
  res.status(StatusCodes.CREATED).json({ quote });
};

const updateQuote = async (req, res) => {
  const {
    body: { quoteText, source, sourceType, tags, favorite },
    user: { userId },
    params: { id: quoteId },
  } = req;

  if (quoteText === "") {
    throw new BadRequestError("Must enter a quote");
  }

  const quote = await Quote.findByIdAndUpdate(
    {
      _id: quoteId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!quote) {
    throw new NotFoundError(`No quote with id ${quoteId}`);
  }
  res.status(StatusCodes.OK).json({ quote });
};

const deleteQuote = async (req, res) => {
  const {
    body: { quoteText },
    user: { userId },
    params: { id: quoteId },
  } = req;

  const quote = await Quote.findOneAndRemove({
    _id: quoteId,
    createdBy: userId,
  });

  if (!quote) {
    throw new NotFoundError(`No quote with id ${quoteId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
};

module.exports = {
  getAllQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
};
