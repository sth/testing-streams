import test from "ava";
import StreamWatcher from "stream-watcher";
import { ChunkReader, NullWriter } from "../lib/streams";

test("NullWriter is writable", async t => {
	const watcher = new StreamWatcher();

	const stream = new NullWriter();
	watcher.watch(stream);

	stream.write("abc");
	stream.end("def");

	await t.notThrows(watcher.finish);
});

test("ChunkReader", async t => {
	const watcher = new StreamWatcher();

	const stream = new ChunkReader(["abc", ()=>{}, "def"]);
	watcher.watch(stream);

	t.is(stream.read().toString(), "abc");
	t.is(stream.read().toString(), "def");
	t.is(stream.read(), null);
	await t.notThrows(watcher.finish);
});

test("ChunkReader", async t => {
	const watcher = new StreamWatcher();

	const stream = new ChunkReader(["abc", new Error("E")]);
	watcher.watch(stream);

	t.is(stream.read().toString(), "abc");
	t.is(stream.read(), null);
	await t.throws(watcher.finish, "E");
});


