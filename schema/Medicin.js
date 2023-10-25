const mongoose = require("mongoose");
const schema = mongoose.Schema;

const medicinschema = new schema(
  {
    userId: {
      type: String,
      require: true,
    },
    medicin: {
      type: Array,
      default: [],
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Medicindetail = mongoose.model("Medicindetail", medicinschema);

module.exports = Medicindetail;
