export class Model {
    college;
    courses;
    constructor() {
        this.college = "NPU";
        this.courses = [new Course("Java Programming", true),
                        new Course("PHP Programming", true),
                        new Course("C++ Programming", true),
                        new Course("JavaScript Programming", true)]
    }
}

export class Course {
    title;
    available;
    constructor(title, available) {
        this.title = title;
        this.available = available;
    }
}