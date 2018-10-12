import CodeGenerator from "./CodeGenerator";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUWVXYZ";
const MAX_INPUT_SIZE = 26 * 26 * 26 * 26;
const MIN_INPUT_SIZE = 0;

export default class SimpleCodeGenerator implements CodeGenerator {

    public Generate(input: number): string {
        if (input < MIN_INPUT_SIZE) {
            throw Error("Cannot generate code from negative number");
        }

        if (input >= MAX_INPUT_SIZE) {
            throw Error("Cannot generate code that")
        }

        let result = "";

        for (let i = 0; i < 4; i++) {
            const index = input % 26;
            result = ALPHABET.charAt(index) + result;
            input /= 26;
        }

        return result;
    }
}
