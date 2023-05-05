class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Perform case-insensitive search using a regular expression
    Object.keys(queryObj).forEach((key) => {
      queryObj[key] = { $regex: new RegExp(queryObj[key], "i") };
    });

    // Search for the specified keyword in all fields
    const searchTerm = this.queryString.search;
    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");
      const searchQuery = { $or: [] };
      Object.keys(this.query.model.schema.paths).forEach((field) => {
        if (field !== "__v" && field !== "_id") {
          searchQuery["$or"].push({ [field]: regex });
        }
      });
      this.query.find({ $and: [queryObj, searchQuery] });
    } else {
      this.query.find(queryObj);
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
