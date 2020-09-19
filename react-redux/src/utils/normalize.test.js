import response from "../items.json";
import { normalizerByPropertyName } from "../utils/normalize";

const normalizedById = {
  2: {
    id: 2,
    name: "таска 2",
    status: "planned",
    description: "lorem ipsum",
  },
  3: {
    id: 3,
    name: "таска 3",
    status: "planned",
    description: "lorem lorem",
  },
  112: {
    id: 112,
    name: "таска 112",
    status: "planned",
    description: "lorem lorem",
  },
  404: {
    id: 404,
    name: "таска 404",
    status: "planned",
    description: "lorem ipsum",
  },
};

const normalizedByName = {
  "таска 112": {
    id: 112,
    name: "таска 112",
    status: "planned",
    description: "lorem lorem",
  },
  "таска 2": {
    id: 2,
    name: "таска 2",
    status: "planned",
    description: "lorem ipsum",
  },
  "таска 3": {
    id: 3,
    name: "таска 3",
    status: "planned",
    description: "lorem lorem",
  },
  "таска 404": {
    id: 404,
    name: "таска 404",
    status: "planned",
    description: "lorem ipsum",
  },
};

describe("Тестирование normalize", () => {
  it("normalize возвращает нормализованный объект", () => {
    expect(normalizerByPropertyName(response, "id")).toEqual(normalizedById);
    expect(normalizerByPropertyName(response, "name")).toEqual(normalizedByName);
  });
});
