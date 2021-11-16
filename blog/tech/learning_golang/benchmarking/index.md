---
layout: base
type: page
emoji: 🚅
title: Benchmarking
description: Benchmarking go programs with the testing package

--- Benchmarking tools built-in with the "testing" package

These can be done by writing test files of the format  "<x>_test.go"

Then creating functions with the prefix Benchmark, like so. `func Benchmark<name>(b *testing.B)`

a simple function that tests a simple multiplication function would be

{% highlight golang linenos %}
package go_test
import (
	"testing"
	"math/rand"
)

func BenchmarkMultiplication(b *testing.B){
	
	b.ResetTimer() // Resets timer so that the values are accurate

	for i := 0; i<b.N; i++ {
						//  ^^^ Allocated dynamically by thetesting package
				
			_ := rand.Int() * rand.Int()
			
	}
}

{% endhighlight %}


The `b.N` Value is allotted by the testing framework based on the projection of how long the function would run.

Typically it allocates b.N in increasing order. 1, 10, 100, 1000, .....

And then averages out the total time taken. every time figuring out the optimal value.

This test can be run using 

{% highlight golang linenos %}
go test -bench=. -benchmem -cpu 1,2,4,8
{% endhighlight %}

Flags :


-bench="" | Takes in a regex string to check for functions  |
 -benchmem | Benchmark memory usage as well | 
 -cpu   |  Number of threads to be allocated |


The number of threads used is shown as <test_name>-<thread_count> in the result

![alt text](/assets/images/benchmark.png)

There are 5 columns in the result. For some reason it's not annotated the arrangement is like,

Test_name_core_count, Number_of_iterations_run, Avg_time_per_iteration, Memory_allocation_per_iteration, number_of_allocs_per_iteration