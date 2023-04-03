package main

import (
	"fmt"
	"testing"
)

func BenchmarkFloat(b *testing.B) {

	b.ResetTimer() // Resets timer so that the values are accurate

	for i := 0; i < b.N; i++ {
		Float64toByteSlice([]float64{1.123, 123.1, 12312.3})
	}
}

func BenchmarkGlob(b *testing.B) {

	b.ResetTimer() // Resets timer so that the values are accurate

	b.Run(fmt.Sprintf("input_size_%d", 1), func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			GlobExample([]float64{1.123, 123.1, 12312.3})
		}
	})
	b.StopTimer()
	//for i := 0; i < b.N; i++ {
	//	_ = rand.Int() * rand.Int()
	//}
}
