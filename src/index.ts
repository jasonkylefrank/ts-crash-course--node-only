import * as fs from "fs";
import { hey } from "./helper.js";

fs;

// console.log("hello from a ts file");

// console.log(hey);

// console.log("Goodbye now.  Have a nice day!!!");


let test: number | string | object = 3;
test = "yo";
// test = false; // error
test = [];
test = {};

//#region --- A type define by a union of 2 built-in types 
type NumString = number | string;
let test2: NumString = 40;
//#endregion

//#region --- Fake enum using union of string values
type Status = 'success' | 'error' | 'pending';
let status: Status = 'pending';
status = 'error';
// status = 'bad'; // error
//#endregion

//#region --- Actual enum type
enum Status2 {
  // Values are optional
  On = 'on',
  Off = 'off'
}

enum Status3 {
  // If values are not provided, then items evaluate to numbers, starting at 0
  On,
  Off
}

let status2: Status2 = Status2.On;

status2 = Status2.Off;
// console.log(status2);

let status3: Status3 = Status3.Off;

status3 = Status3.On;
// console.log(status3);

//#endregion


//#region --- Functions

function add(x:number, y: number): number {
  return x + y;
}

// add("hello", 12);
//#endregion



//#region --- Objects (interface)

interface IInstructor {
  name: string;
  course: string;
  age?: number; // optional property
  [Key: string]: any; // wildcard to allow any other optional properties

  getFunky(param?: number | string): string;
}

// Object literals example
const conner: IInstructor = {
  name: 'Conner',
  course: 'Frontend Expert',
  age: 50,
  getFunky: () => 'This is funky'
}
const clement: IInstructor = {
  name: 'Clement',
  course: 'AlgoExpert',
  specialty: 4,
  getFunky: (age: number) => `You are ${age} funky`
}

class AlgoExpertInstructor implements IInstructor {
  public name: string;
  public course: string;
  public age: number;
  // Extra property that is not defined in the interface
  private hairStyle: string;

  constructor(name: string, course: string, age?: number, hairStyle?: string) {
    this.name = name;
    this.course = course;
    this.age = age;
    this.hairStyle = hairStyle;
  }
  
  getFunky(style?: string | number): string {
    return `You are very ${style} funky!`;
  }
}

const bob: AlgoExpertInstructor = new AlgoExpertInstructor("Bob", "math", 14);

let sam: AlgoExpertInstructor;
sam = new AlgoExpertInstructor("Sam", "Chinese", 51, "Mullet");

// console.dir(bob);
// console.dir(sam);

//#endregion


//#region --- Generics
// Starts at 14:35 into the video

// An Array of type number
// const arr: Array<number> = [1,4,3, 'four']; // error
const arr: Array<number> = [1,4,3]; // error

// In this example, we want to ensure that the value passed-in to the setter and the 
//  value returned by the getter are the same.  And we can do that for the Key as well.
interface IGetterSetter<Key, Value> {
  //#region --- IF WE DON'T ENSURE THE TYPE REMAINS CONSTANT, THEN THIS IS HOW WE COULD DO IT ---

  // SYNTAX OPTION 1:
  // This seems to be one syntax for specifying function members
  // set(key: string, value: any): void;
  // get(key: string): any;

  // SYNTAX OPTION 2:
  // This is the syntax that Conner showed in the video
  // set2: (key: string, value: any) => void;
  // get2: (key: string) => any;
  //#endregion

  // --- BUT TO ENSURE THE TYPE REMAINS CONSISTANT, WE DO IT LIKE THIS ---

  // (Using syntax option 2)
  set: (key: Key, value: Value) => void;
  get: (key: Key) => Value;
}

class MapWrapper implements IGetterSetter<number, AlgoExpertInstructor> {
  map: Map<number, AlgoExpertInstructor> = new Map();
  
  set(key: number, value: AlgoExpertInstructor): void {
    this.map.set(key, value);
  };

  get(key: number): AlgoExpertInstructor {
    return this.map.get(key);
  };
}

const myMap: MapWrapper = new MapWrapper();

myMap.set(1, new AlgoExpertInstructor("Chester", "History"));
myMap.set(7, new AlgoExpertInstructor("Tony", "English"));

console.log(myMap.get(7));

console.dir(myMap);

//#endregion