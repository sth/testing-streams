import stream from "stream";

export class ChunkReader extends stream.Readable {
	constructor(chunks) {
		super();
		this.chunks = chunks;
	}
	_read(size_unused) {
		while (this.chunks.length) {
			const chunk = this.chunks.shift();
			if (chunk instanceof Error) {
				this.emit("error", chunk);
				return;
			}
			if (chunk instanceof Function) {
				if (!chunk(this))
					return;
			}
			else if (!this.push(chunk)) {
				return;
			}
		}
		this.push(null);
	}
}

export class NullWriter extends stream.Writable {
	_write(c, e, cb) { cb(); }
}
