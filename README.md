# testing-streams

Streams for test cases.

The streams read/write predefined data and errors.

## API

### new ChunkReader(chunks, [options])

A readable stream that produces the given `chunks` of data when sombody tries
to read from the stream.

`chunks` is an array that contains data objects, but it can also contain `Error`
instances if the stream should emit errors. Additionally `chunks` can contain
functions that are called as callbacks and can implement more complicated custom
behavior.

For each read() the stream processes the next items in `chunks`.

```
function readHandler(stream) {
    // We could push some data
    stream.push("some data");

    // We could also emit an error
    stream.emit('error', new Error("some error"));

    // If we return a truthy value, the ChunkReader immediately processes
    // the next chunk. If it's falsy ChunkReader instead waits for the
    // next read.
    return true;
}

const reader = new ChunkReader(["plain data", readHandler, new Error("a failure")])
// calls to reader.read() will return "plain data" and "some data" and then raise
// errors "some error" and "a failure".
```

### new NullWriter()

A writable stream that accepts and ignores anything that is written to it .
