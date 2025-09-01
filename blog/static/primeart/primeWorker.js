// public/primeWorker.js

// This is a simplified polyfill/setup for BigInt,
// assuming the environment where the worker runs might not have it globally
// or to ensure it works as expected. Modern workers should have BigInt.
// For this example, we'll assume BigInt is available.

// BigInt constants
const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);
const THREE = BigInt(3);
// Add other BigInt constants if needed, or pass them/redefine them

/**
 * Calculates (base^exponent) % modulus efficiently.
 */
function power(base, exponent, modulus) {
  let res = ONE;
  base %= modulus;
  while (exponent > ZERO) {
    if (exponent % TWO === ONE) res = (res * base) % modulus;
    base = (base * base) % modulus;
    exponent /= TWO; // BigInt division
  }
  return res;
}

/**
 * Miller-Rabin primality test.
 */
function isPrime(n, k = 8) {
  if (n <= ONE) return false;
  if (n <= THREE) return true;
  if (n % TWO === ZERO || n % THREE === ZERO) return false;

  let s = ZERO;
  let d = n - ONE;
  while (d % TWO === ZERO) {
    d /= TWO;
    s++;
  }

  for (let i = 0; i < k; i++) {
    // Simplified random BigInt generation for worker context
    // This might need a more robust BigInt random number generator for very large n
    let a;
    const nMinusTwo = n - TWO;
    if (nMinusTwo <= ZERO) a = TWO; // Should not happen if n > 3
    else {
        // Crude way to get a random BigInt, improve if possible
        const randomStr = Array.from({length: nMinusTwo.toString().length -1  || 1}, () => Math.floor(Math.random() * 10)).join('');
        try {
            a = BigInt(randomStr) % (nMinusTwo - TWO > 0 ? nMinusTwo - TWO : TWO) + TWO;
        } catch (e) {
            // Fallback if randomStr is empty or invalid for BigInt
             a = TWO + BigInt(Math.floor(Math.random() * 100)); // smaller random
             if (a >= n - ONE) a = TWO;
        }

    }
     if (a >= n - ONE) a = n - TWO < TWO ? TWO : n-TWO; // ensure 'a' is in range [2, n-2]


    if (trialComposite(a, d, n, s)) {
      return false;
    }
  }
  return true;
}

function trialComposite(a, d, n, s) {
  let x = power(a, d, n);
  if (x === ONE || x === n - ONE) {
    return false;
  }
  for (let r = ONE; r < s; r++) {
    x = power(x, TWO, n);
    if (x === n - ONE) {
      return false;
    }
  }
  return true;
}

/**
 * Mutates a number string.
 */
function mutate(numStr, mutationCount = 103) {
  let numArr = numStr.split('');
  const len = numArr.length;
  if (len <= 1 && numStr !== '0') return numStr;
  if (len === 0) return "7"; // return a default prime if empty

  const actualMutationCount = Math.min(mutationCount, len > 0 ? len : 1);

  for (let k = 0; k < actualMutationCount; k++) {
    const pos = Math.floor(Math.random() * len);
    const newDigit = String(Math.floor(Math.random() * 10));
    if (pos === 0 && newDigit === '0' && len > 1) {
      numArr[pos] = String(Math.floor(Math.random() * 9) + 1);
    } else {
      numArr[pos] = newDigit;
    }
  }
  let result = numArr.join('');
  // If mutation results in "0" or "00", etc., make it a non-zero digit.
  if (BigInt(result) === ZERO && result.length > 0) {
      result = String(Math.floor(Math.random() * 9) + 1).padStart(result.length, '0');
  }
  return result;
}

/**
 * Finds a prime number.
 */
async function findPrimeWorker(initialNumStr) {
  let attempts = 0;
  let foundPrime = false;
  let candidateStr = initialNumStr;

  if (candidateStr.length === 0) candidateStr = "7"; // Default if empty
  if (BigInt(candidateStr) === ZERO) candidateStr = mutate(candidateStr || "0");


  while (!foundPrime) {
    attempts++;
    candidateStr = mutate(candidateStr);

    // Post progress back to the main thread
    if (attempts % 5 === 0) { // Post progress every 5 attempts
        self.postMessage({
            type: 'progress',
            payload: { attempts, currentCandidate: candidateStr.substring(0, Math.min(30, candidateStr.length)) + "..." }
        });
    }

    try {
        const candidateBigInt = BigInt(candidateStr);
        // Basic check, isPrime will handle more thoroughly
        if (candidateBigInt <= ONE) {
            candidateStr = mutate(candidateStr); // Ensure it's > 1
            continue;
        }
        if (isPrime(candidateBigInt)) {
            foundPrime = true;
            self.postMessage({ type: 'result', payload: candidateStr });
        }
    } catch(e) {
        // If candidateStr becomes non-numeric or too large for BigInt (unlikely with string ops)
        console.error("Error in worker during prime search:", e, "Candidate:", candidateStr);
        candidateStr = mutate(initialNumStr); // Reset and try again
         self.postMessage({
            type: 'error',
            payload: { message: e.message, candidate: candidateStr }
        });
    }
    // A brief pause to allow message queue to be processed, not strictly necessary with async/await.
    // await new Promise(r => setTimeout(r, 0));
  }
}

self.onmessage = function(e) {
  console.log('Worker: Message received from main script');
  const { initialNumStr } = e.data;
  if (!initialNumStr) {
    self.postMessage({ type: 'error', payload: 'Initial number string is missing.' });
    return;
  }
  console.log('Worker: Starting prime search for', initialNumStr.substring(0, 30) + "...");
  findPrimeWorker(initialNumStr);
};
