import SimpleCodeGenerator from "../code/SimpleCodeGenerator";

describe("CodeGenerator", () => {
    let generator: SimpleCodeGenerator;

    beforeEach(() => {
        generator = new SimpleCodeGenerator();
    });

    test("Generates code AAAA", () => {
        const expected = "AAAA";
        const actual = generator.Generate(0);

        expect(actual).toBe(expected);
    });

    test("Generates code AAAB", () => {
        const expected = "AAAB";
        const actual = generator.Generate(1);

        expect(actual).toBe(expected);
    });

    test("Generates code AABA", () => {
        const expected = "AABA";
        const actual = generator.Generate(26);

        expect(actual).toBe(expected);
    });

    test("Generates code ABAA", () => {
        const expected = "ABAA";
        const actual = generator.Generate(26 * 26);

        expect(actual).toBe(expected);
    });

    test("Generates code BAAA", () => {
        const expected = "BAAA";
        const actual = generator.Generate(26 * 26 * 26);

        expect(actual).toBe(expected);
    });

    test("Generates code ZZZZ", () => {
        const expected = "ZZZZ";
        const actual = generator.Generate((26 * 26 * 26 * 26) - 1);

        expect(actual).toBe(expected);
    });

    test("Fails on negative", () => {
        expect(() => generator.Generate(-1)).toThrowError();
    });

    test("Fails on too large", () => {
        expect(() => generator.Generate(26 * 26 * 26 * 26)).toThrowError();
    });
});
