const normalize = (input, schema) => {
  if (typeof input !== "object" || !input) {
    return input;
  }

  if (Array.isArray(input)) {
   return input.map((item) => normalize(item, schema));
  }

  const object = { ...input };
  Object.keys(schema).forEach((key) => {
    const value = normalize(input[key], schema[key]);
    if (value === undefined || value === null) {
      delete object[key];
    } else {
      object[key] = value;
    }
  });
  return object;
};

export default normalize;
