export const normalizerByPropertyName = (input, propertyName) => {
  const object = {};
  return input.reduce((data, item) => {
    data[item[propertyName]] = item;
    return data;
  }, object);
};
