
import { BN } from "../types/general";
import { EthArgs } from "../types/parameters";
import { AbiItem } from "./abi";

/**
 * Represents 1 second for functions that accept a parameter in milliseconds.
 */
export const SECONDS = 1000;

/**
 * Pauses the thread for the specified number of milliseconds.
 * @param ms The number of milliseconds to pause for.
 */
export const sleep = async (ms: number): Promise<void> =>
    // tslint:disable-next-line: no-string-based-set-timeout
    new Promise<void>(resolve => setTimeout(resolve, ms));


/**
 * Remove 0x prefix from a hex string. If the input doesn't have a 0x prefix,
 * it's returned unchanged.
 * @param hex The hex value to be prefixed.
 */
export const strip0x = (hex: string) => hex.substring(0, 2) === "0x" ? hex.slice(2) : hex;

/**
 * Add a 0x prefix to a hex value, converting to a string first. If the input
 * is already prefixed, it's returned unchanged.
 * @param hex The hex value to be prefixed.
 */
export const Ox = (hex: string | BN | Buffer) => {
    const hexString = typeof hex === "string" ? hex : hex.toString("hex");
    return hexString.substring(0, 2) === "0x" ? hexString : `0x${hexString}`;
};

/**
 * Returns a hex string filled with zeroes (prefixed with '0x').
 * @param bytes The number of bytes.
 */
export const NULL = (bytes: number) => Ox("00".repeat(bytes));

/**
 * Converts an Ethereum ABI and values to the parameters expected by RenJS
 * for shifting in.
 * @param options The ABI of the function, or ABI of the contract and the
 *                function name.
 * @param args The values of the parameters - one per function input.
 */
// tslint:disable-next-line: no-any
export const abiToParams = <ABI extends AbiItem>(options: { fnABI: ABI } | { contractABI: ABI[], fnName: string }, ...args: Array<{}>): EthArgs => {
    const { fnABI, contractABI, fnName } = options as { fnABI?: ABI, contractABI?: ABI[], fnName?: string };

    const abi = fnABI || (contractABI ? contractABI.filter(x => x.type === "function" && x.name === fnName)[0] : undefined);

    if (!abi) {
        throw new Error(fnName ? `Unable to find ABI for function ${fnName}.` : `Invalid ABI passed in.`);
    }

    const inputs = abi.inputs || [];

    if (inputs.length !== args.length) {
        throw new Error(`Mismatched parameter count. Expected ${inputs.length} but got ${args.length} inputs.`);
    }

    return inputs.map((input, i) => ({
        name: input.name,
        value: args[i],
        type: input.type,
    }));
};
