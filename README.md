# Safe Base64 codecs for JavaScript

A pure JavaScript port of the libsodium base64 codecs.

Features:

* Supports traditional and URL-safe variants, with or without padding
* Rejects non-canonical padding
* Constant-time (best-effort), suitable for encoding/decoding secrets
* Characters can be ignored by the decoder

Usage:

- Traditional alphabet, padding:

```js
const codec = new Base64(true);
const b64 = codec.encode(data);
const data2 = codec.decode(b64);
```

- Traditional alphabet, no padding:

```js
const codec = new Base64(false);
const b64 = codec.encode(data);
const data2 = codec.decode(b64);
```

- URL-safe, no padding:

```js
const codec = new Base64UrlSafe(false);
const b64 = codec.encode(data);
const data2 = codec.decode(b64);
```

- URL-safe, padding, ignoring spaces and `\n`:

```js
const codec = new Base64UrlSafe(true, " \n");
const b64 = codec.encode(data);
const data2 = codec.decode(b64);
```