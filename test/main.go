package main

import (
	"bytes"
	"encoding/gob"
	"reflect"
	"unsafe"
)

const (
	SIZEOF_FLOAT64 = 8
)

func Float64toByteSlice(data []float64) []byte {
	header := *(*reflect.SliceHeader)(unsafe.Pointer(&data))
	header.Len *= SIZEOF_FLOAT64
	header.Cap *= SIZEOF_FLOAT64

	// Convert slice header to an []int32
	b := *(*[]byte)(unsafe.Pointer(&header))
	return b
}

func GlobExample(data []float64) []byte {
	var buf bytes.Buffer
	enc := gob.NewEncoder(&buf)

	_ = enc.Encode(data)
	// hash := md5.Sum(buf.Bytes())
	// h := hex.EncodeToString(hash[:])
	return buf.Bytes()
}
