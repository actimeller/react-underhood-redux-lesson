import response from "../items.json";
import createSelector from "../utils/createSelector";

const initialState = { items: response };

describe("Тестирование createSelector", () => {
  it("createSelector возвращает объект из стора", () => {
    const getPlannedItems = createSelector(
      ({ items }) => items,
      (items) => items.filter((item) => item.status === "planned")
    );
    expect(
      initialState.items.filter((item) => (item) => item.status === "planned")
    ).toEqual(getPlannedItems(initialState));
  });
});
