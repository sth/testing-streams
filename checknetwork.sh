#!/bin/bash

function run() {
	echo "$@"
	"$@"
}

run ifconfig
run dig registry.yarnpkg.com

dig registry.yarnpkg.com | grep '^yarn' | while read A B C D IP; do
	run traceroute -n "$IP"
done