function trimFields(obj, fields) {
  fields.forEach((field) => {
    if (obj[field]) {
      obj[field] = obj[field].trim();
    }
  });

  return obj;
}

module.exports = trimFields;
