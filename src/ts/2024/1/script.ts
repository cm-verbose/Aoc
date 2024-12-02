import fs from "fs";

class Solution {
  constructor() {
    this.ini();
  }

  private async ini() {
    const data = await this.readFile("./input.txt");
    const lists = this.parseNums(data);
    this.computeTotalDistance(lists);
    this.computeSimilarity(lists); 
  }

  /** @description Reads the specified path */
  private readFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: "utf-8" }, (error, data) => {
        if (error !== null) {
          reject(error);
        }
        resolve(data);
      });
    });
  }

  /** @description Gets numbers in arrays*/
  private parseNums(data: string): Array<Array<number>> {
    let ptr = 0;

    let i = 0;
    const list1: number[] = [];
    const list2: number[] = [];

    while (ptr < data.length) {
      const current = data[ptr];

      if (current.match(/\d/)) {
        let numberString: string = "";

        while (ptr < data.length && data[ptr].match(/\d/)) {
          numberString += data[ptr];
          ptr += 1;
        }
        const num = Number.parseInt(numberString, 10);
        if (i % 2 == 0) {
          list1.push(num);
        } else {
          list2.push(num);
        }
        i += 1;
      }
      ptr += 1;
    }

    return [list1.sort(), list2.sort()];
  }

  /** @description Computes the distance between each number */
  computeTotalDistance(lists: Array<Array<number>>) {
    let acc = 0;
    for (let i = 0; i < lists[0].length; i++) {
      acc += Math.abs(lists[1][i] - lists[0][i]);
    }
    console.log(acc);
  }

  /** @description Computes the distance between each number */
  computeSimilarity(lists: Array<Array<number>>) {
    let acc = 0;
    lists[0].forEach((number) => {
      acc += number * lists[1].filter((x) => x === number).length;
    });
    console.log(acc);
  }
}

new Solution();
