import {Base64, Base64UrlSafe} from '../src/main';

describe('Base64', () => {
    describe('Traditional Base64', () => {
        const codec = new Base64(true);

        test('should encode and decode empty buffer', () => {
            const data = new Uint8Array([]);
            const encoded = codec.encode(data);
            expect(encoded).toBe('');
            const decoded = codec.decode(encoded);
            expect(decoded).toEqual(data);
        });

        test('should encode and decode simple string', () => {
            const data = new TextEncoder().encode('Hello, World!');
            const encoded = codec.encode(data);
            expect(encoded).toBe('SGVsbG8sIFdvcmxkIQ==');
            const decoded = codec.decode(encoded);
            expect(decoded).toEqual(data);
        });

        test('should handle binary data', () => {
            const data = new Uint8Array([0, 255, 128, 64, 32, 16, 8, 4, 2, 1]);
            const encoded = codec.encode(data);
            const decoded = codec.decode(encoded);
            expect(decoded).toEqual(data);
        });

        test('should reject invalid padding', () => {
            expect(() => codec.decode('SGVsbG8sIFdvcmxkIQ')).toThrow('Invalid base64 padding');
        });

        test('should handle ignored characters', () => {
            const codecWithIgnore = new Base64(true, ' \n');
            const data = new TextEncoder().encode('Hello');
            const encoded = 'SGVs bG8=';
            const decoded = codecWithIgnore.decode(encoded);
            expect(decoded).toEqual(data);
        });
    });

    describe('URL-safe Base64', () => {
        const codec = new Base64UrlSafe(false);

        test('should encode and decode empty buffer', () => {
            const data = new Uint8Array([]);
            const encoded = codec.encode(data);
            expect(encoded).toBe('');
            const decoded = codec.decode(encoded);
            expect(decoded).toEqual(data);
        });

        test('should encode and decode simple string', () => {
            const data = new TextEncoder().encode('Hello, World!');
            const encoded = codec.encode(data);
            expect(encoded).toBe('SGVsbG8sIFdvcmxkIQ');
            const decoded = codec.decode(encoded);
            expect(decoded).toEqual(data);
        });

        test('should handle binary data', () => {
            const data = new Uint8Array([0, 255, 128, 64, 32, 16, 8, 4, 2, 1]);
            const encoded = codec.encode(data);
            const decoded = codec.decode(encoded);
            expect(decoded).toEqual(data);
        });

        test('should handle ignored characters', () => {
            const codecWithIgnore = new Base64UrlSafe(false, ' \n');
            const data = new TextEncoder().encode('Hello');
            const encoded = 'SGVs\nbG8 ';
            const decoded = codecWithIgnore.decode(encoded);
            expect(decoded).toEqual(data);
        });
    });

    describe('Edge Cases', () => {
        test('should handle single byte', () => {
            const data = new Uint8Array([65]); // 'A'
            const encoded = new Base64(true).encode(data);
            expect(encoded).toBe('QQ==');
            const decoded = new Base64(true).decode(encoded);
            expect(decoded).toEqual(data);
        });

        test('should handle two bytes', () => {
            const data = new Uint8Array([65, 66]); // 'AB'
            const encoded = new Base64(true).encode(data);
            expect(encoded).toBe('QUI=');
            const decoded = new Base64(true).decode(encoded);
            expect(decoded).toEqual(data);
        });

        test('should handle three bytes', () => {
            const data = new Uint8Array([65, 66, 67]); // 'ABC'
            const encoded = new Base64(true).encode(data);
            expect(encoded).toBe('QUJD');
            const decoded = new Base64(true).decode(encoded);
            expect(decoded).toEqual(data);
        });
    });

    describe('Error Cases', () => {
        test('should reject invalid characters', () => {
            const codec = new Base64(true);
            expect(() => codec.decode('SGVsbG8sIFdvcmxkIQ@')).toThrow();
        });

        test('should reject non-canonical padding', () => {
            const codec = new Base64(true);
            expect(() => codec.decode('SGVsbG8sIFdvcmxkIQ===')).toThrow('Invalid base64 padding length');
        });

        test('should reject non-canonical encoding', () => {
            const codec = new Base64(true);
            expect(() => codec.decode('AAB=')).toThrow('Non-canonical base64 encoding');
        });

        test('should reject invalid padding position', () => {
            const codec = new Base64(true);
            expect(() => codec.decode('A=BC')).toThrow('Non-canonical base64 encoding');
        });
    });

    describe('Boundary Cases', () => {
        test('should handle maximum valid input', () => {
            const data = new Uint8Array(1024).fill(0xFF);
            const codec = new Base64(true);
            const encoded = codec.encode(data);
            const decoded = codec.decode(encoded);
            expect(decoded).toEqual(data);
        });

        test('should handle all possible byte values', () => {
            const data = new Uint8Array(256);
            for (let i = 0; i < 256; i++) {
                data[i] = i;
            }
            const codec = new Base64(true);
            const encoded = codec.encode(data);
            const decoded = codec.decode(encoded);
            expect(decoded).toEqual(data);
        });
    });
}); 