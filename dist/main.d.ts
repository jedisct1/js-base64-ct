/**
 * Custom Base64 encoding/decoding, with support for arbitrary char<->maps.
 */
export declare class Base64Codec {
    private _ignore;
    private _padding;
    private _charToByte;
    private _byteToChar;
    /**
     * Custom Base64 encoding/decoding.
     *
     * @param padding - whether padding is used.
     * @param ignore - string of characters to ignore.
     * @param charToByte - function to convert Base64 char to a byte.
     * @param byteToChar - function to convert byte to a Base64 char.
     */
    constructor(padding: boolean | undefined, ignore: string | null | undefined, charToByte: Function, byteToChar: Function);
    /**
     * Encode a buffer to Base64.
     *
     * @param data - a buffer to encode.
     * @returns a Base64 encoded string.
     */
    encode(data: Uint8Array): string;
    /**
     * Decode a Base64 string to a buffer.
     *
     * @param data - a Base64 string to decode.
     * @returns a buffer.
     * @throws an error if the string is not a valid Base64 string.
     */
    decode(data: string): Uint8Array;
}
/**
 * Traditional Base64 encoding/decoding.
 */
export declare class Base64 extends Base64Codec {
    /**
     * Traditional Base64 encoding/decoding.
     *
     * @param padding - whether padding is used.
     * @param ignore - string of characters to ignore.
     */
    constructor(padding?: boolean, ignore?: string | null);
}
/**
 * URL-safe Base64 encoding/decoding.
 */
export declare class Base64UrlSafe extends Base64Codec {
    /**
     * URL-safe Base64 encoding/decoding.
     *
     * @param padding - whether padding is used.
     * @param ignore - string of characters to ignore.
     */
    constructor(padding?: boolean, ignore?: string | null);
}
