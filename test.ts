class Human {
  name:string;
  title:string;
  constructor(name:string, title:string) {
    this.name = name;
    this.title = title;
  }
  greet(){
    console.log(`Hi, ${this.name} ${this.title}`);
  }
}

export {
  Human
};
