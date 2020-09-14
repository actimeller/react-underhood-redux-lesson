import createSelector from "../utils/createSelector";

const getItems = createSelector(
  ({ items }) => items,
  (items) => items
);

export default getItems;
