class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const { search, company, location, contract } = this.queryString;
    let searchQuery = []; // Declare and initialize the searchQuery variable

    // Search by company and position
    if (search) {
      let searchWords = search.split(/[\s-]+/);

      if (search === "fullstack") {
        searchWords = ["full", "stack"];
      } else if (search === "frontend") {
        searchWords = ["front", "end"];
      } else if (search === "backend") {
        searchWords = ["back", "end"];
      }

      searchQuery = searchWords.map((word) => ({
        $or: [
          { company: new RegExp(word, "i") },
          { position: new RegExp(word, "i") },
          { description: new RegExp(word, "i") },
          { "requirements.content": new RegExp(word, "i") },
          { "role.content": new RegExp(word, "i") },
          {
            "requirements.items": {
              $elemMatch: { $regex: new RegExp(word, "i") },
            },
          }, // Search within requirements.items array
          { "role.items": { $elemMatch: { $regex: new RegExp(word, "i") } } }, // Search within role.items array
        ],
      }));
      this.query = this.query.find({
        $and: searchQuery, // Use the $and operator to match all words
      });
    }

    if (company) {
      searchQuery = company
        .toLowerCase()
        .split(" ")
        .map((word) => ({
          $or: [{ company: new RegExp(word, "i") }],
        }));
      this.query = this.query.find({
        $and: searchQuery,
      });
    }

    // Search by location (case-insensitive)
    if (location) {
      searchQuery = location
        .toLowerCase()
        .split(" ")
        .map((word) => ({
          $or: [{ location: new RegExp(word, "i") }],
        }));
      this.query = this.query.find({
        $and: searchQuery,
      });
    }

    if (contract) {
      searchQuery = contract
        .toLowerCase()
        .split(" ")
        .map((word) => ({
          $or: [{ contract: new RegExp(word, "i") }],
        }));
      this.query = this.query.find({
        $and: searchQuery,
      });
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
