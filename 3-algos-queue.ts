// BE SURE TO IMPORT YOUR QUEUE CLASS
import { Queue } from "./1-queue";
import { Stack } from "./2-stack";
// ==============================
// 1️⃣ Implement a Recent Calls Counter
// ==============================
// Write a function that counts the number of requests received in the past 3000 milliseconds.
// Use a queue to efficiently track the timestamps of requests.
class RecentCounter {
  private queue: Queue<number>;

  constructor() {
    this.queue = new Queue<number>();
  }
  ping = (timestamp: number): number => {
     this.queue.enqueue(timestamp);
    while (this.queue.front() !== undefined && this.queue.front()! < timestamp - 3000) {
      this.queue.dequeue();
    }
    return this.queue.size();
  };
}

const recentCounter = new RecentCounter();
// Example Test Cases:
// console.log(recentCounter.ping(100));
// console.log(recentCounter.ping(500));   
// console.log(recentCounter.ping(2500)); 
// console.log(recentCounter.ping(3100));  
// console.log(recentCounter.ping(4000));   
// console.log(recentCounter.ping(7000));   
// console.log(recentCounter.ping(9000));
// console.log(recentCounter.ping(12000));  
// console.log(recentCounter.ping(15000));  
// console.log(recentCounter.ping(20000));  
  

// ==============================
// 2️⃣ First Unique Character in a String
// ==============================
// Given a string `s`, find the **first unique character** and return its index.
// If no unique character exists, return `-1`. Use a queue to efficiently track character order.
const firstUniqChar = (str: string, queue = new Queue<string>()): number => {
  const map = new Map<string, number>();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    map.set(char, (map.get(char) || 0) + 1);

    if (map.get(char) === 1) {
      queue.enqueue(char);
    }
  }
  while (!queue.isEmpty() && map.get(queue.front()!)! > 1) {
    queue.dequeue(); 
  }
  return queue.isEmpty() ? -1 : str.indexOf(queue.front()!);
};
// Example Test Cases:
// console.log(firstUniqChar("leetcode")) // 0
// console.log(firstUniqChar("loveleetcode")) // 2
// console.log(firstUniqChar("aabb")) // -1

// ==============================
// 3️⃣ Implement a Stack Using Queues
// ==============================
// Implement a stack using only two queues.
// The implemented stack should support `push`, `pop`, `top`, and `isEmpty` operations.
class MyStack {
  private queue1: Queue<number>;
  private queue2: Queue<number>;
  constructor() {
    this.queue1 = new Queue<number>();
    this.queue2 = new Queue<number>();
  } 
  push(num: number): void {
    this.queue1.enqueue(num);
  }
  pop(): number | undefined {
    while (this.queue1.size() > 1) {
      this.queue2.enqueue(this.queue1.dequeue()!);
    }
    const lastNum = this.queue1.dequeue();
    [this.queue1, this.queue2] = [this.queue2, this.queue1]
    return lastNum;
  }
  top(): number | undefined {
    while (this.queue1.size() > 1) {
      this.queue2.enqueue(this.queue1.dequeue()!);
    }
    [this.queue1, this.queue2] = [this.queue2, this.queue1];
    return this.queue2.front();
  }
  isEmpty(): boolean {
    // console.log(this.queue1, this.queue2)
    return this.queue1.isEmpty()
  }
}
const myStack = new MyStack();
// Example Test Cases:
// myStack.push(1);
// myStack.push(2);
// console.log(myStack.top());    // Output: 2
// console.log(myStack.pop());    // Output: 2
// console.log(myStack.isEmpty()); // Output: false
// console.log(myStack.pop());    
// console.log(myStack.isEmpty()); 

// ==============================
// 4️⃣ Rotting Oranges
// ==============================
// Given a 2D grid where `0` is an empty cell, `1` is a fresh orange, and `2` is a rotten orange,
// determine the minimum number of minutes needed for all fresh oranges to rot. Use BFS with a queue.
const orangesRotting = (oranges: number[][], queue = new Queue<any>()): number => {
  let cols: number = oranges[0].length;
  let time: number = 0;
  let notRotten: number = 0;
  for(let r = 0; r < oranges.length; r++) {
    for(let c = 0; c < cols; c++) {
        if(oranges[r][c] === 2) {
          queue.enqueue([r, c]);
        } else if(oranges[r][c] === 1) notRotten++;
    }
  }
  if(notRotten === 0) return 0;

  while(!queue.isEmpty()) {
    let rotted: boolean = false;
    let queueSize: number = queue.size(); 
    for(let i = 0; i < queueSize; i++) {
      const [r, c] = queue.dequeue();
      let left = (c - 1 >= 0) ? oranges[r][c - 1] : undefined;
      let right = (c + 1 < cols) ? oranges[r][c + 1] : undefined;
      let up = (r - 1 >= 0) ? oranges[r - 1][c] : undefined;
      let down = (r + 1 < oranges.length) ? oranges[r + 1][c] : undefined;

      if(left === 1) {
        oranges[r][c - 1] = 2;
        queue.enqueue([r, c - 1]);
        rotted = true;
      }
      if(right === 1) {
        oranges[r][c + 1] = 2;
        queue.enqueue([r, c + 1]);
        rotted = true;
      }
      if(up === 1) {
        oranges[r - 1][c] = 2;
        queue.enqueue([r - 1, c]);
        rotted = true;
      }
      if(down === 1) {
        oranges[r + 1][c] = 2;
        queue.enqueue([r + 1, c]);
        rotted = true;
      }
    }
    if(rotted === true) time++;
  }
  for(let r = 0; r < oranges.length; r++) {
    for(let c = 0; c < cols; c++) {
      if(oranges[r][c] === 1) {
        return -1;
      } 
    }
  }
  return time;
}
// Example Test Cases:
// console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])) // -1
// console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])) // 4
// console.log(orangesRotting([[0,2]])) // 0

// ==============================
// 5️⃣ Sliding Window Maximum
// ==============================
// Given an array `nums` and an integer `k`, return the maximum values in every window of size `k`.
// Use a deque (double-ended queue) to efficiently track the max values.
function maxSlidingWindow(arr: number[], k: number): number[] {
  const result: number[] = [];
  const queue = new Queue<number>(); 

  for (let i = 0; i < arr.length; i++) {
    if (!queue.isEmpty() && queue.front()! < i - k + 1) {
      queue.dequeue();
    }
    while (!queue.isEmpty() && arr[queue.front()!] < arr[i]) {
      queue.dequeue(); 
    }
    queue.enqueue(i);

    if (i >= k - 1) {
      result.push(arr[queue.front()!]); 
    }
  }
  return result;
}
// Example Test Cases:
// console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)) // [3,3,5,5,6,7]
// console.log(maxSlidingWindow([1], 1)) // [1]
// console.log(maxSlidingWindow([9, 11], 2)) // [11]
