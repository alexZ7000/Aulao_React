import sum from "../src/app/utils/functions/sum";

test("add 1 + 2 to equal 3", () => {
    expect(sum()).toBe(3);
});
