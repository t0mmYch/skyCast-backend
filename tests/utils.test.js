const { createRef, formatSearchHistory } = require("../utils");

describe("createRef", () => {
  test("returns an empty object when passed an empty array", () => {
    //Arrange
    const input = [];
    //Act
    const result = createRef(input, "key", "value");
    //Assert
    expect(result).toEqual({});
  });

  test("returns correct mapping for single object", () => {
    //Arrange
    const input = [{ name: "Alice", id: 1 }];
    //Act
    const result = createRef(input, "name", "id");
    //Assert
    expect(result).toEqual({ Alice: 1 });
  });

  test("returns correct mapping for multiple objects", () => {
    const input = [
      { name: "Alice", id: 1 },
      { name: "Bob", id: 2 },
      { name: "Carol", id: 3 }
    ];
    const result = createRef(input, "name", "id");
    expect(result).toEqual({ Alice: 1, Bob: 2, Carol: 3 });
  });

  test("does not mutate the input array", () => {
    const input = [{ name: "Dave", id: 4 }];
    const original = [...input];
    createRef(input, "name", "id");
    expect(input).toEqual(original);
  });
});

describe("formatSearchHistory", () => {
  test("returns an empty array if passed an empty array", () => {
    const input = [];
    const userIdLookup = {};
    const result = formatSearchHistory(input, userIdLookup);
    expect(result).toEqual([]);
  });

  test("formats a single search history record correctly", () => {
    const input = [{ city: "London", searched_at: "2024-01-01", username: "alice" }];
    const userIdLookup = { alice: 1 };
    const result = formatSearchHistory(input, userIdLookup);
    expect(result).toEqual([
      { city: "London", searched_at: "2024-01-01", user_id: 1 }
    ]);
  });

  test("formats multiple records using userIdLookup", () => {
    const input = [
      { city: "London", searched_at: "2024-01-01", username: "alice" },
      { city: "Paris", searched_at: "2024-01-02", username: "bob" }
    ];
    const userIdLookup = { alice: 1, bob: 2 };
    const result = formatSearchHistory(input, userIdLookup);
    expect(result).toEqual([
      { city: "London", searched_at: "2024-01-01", user_id: 1 },
      { city: "Paris", searched_at: "2024-01-02", user_id: 2 }
    ]);
  });

  test("throws if username is not in userIdLookup", () => {
    const input = [{ city: "Berlin", searched_at: "2024-01-03", username: "charlie" }];
    const userIdLookup = {};
    expect(() => formatSearchHistory(input, userIdLookup)).toThrow();
  });
});
