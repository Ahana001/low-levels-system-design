enum Direction {
  "UP" = "UP",
  "DOWN" = "DOWN",
}

class Elevator {
  private id: number;
  private maxFloor: number = 1;
  private maxCapacity: number = 1; // per person
  private currentFloor: number = 1;
  private direction: Direction | null = null;
  private isIdle: boolean = true;
  private doorOpen: boolean = false;
  private passengers: string[] = [];

  constructor(id: number, maxFloor: number, maxCapacity: number) {
    this.id = id;
    this.maxFloor = maxFloor;
    this.maxCapacity = maxCapacity;
  }

  getCurrentFloor(): number {
    return this.currentFloor;
  }

  moveUp(): void {
    if (this.currentFloor < this.maxFloor) {
      this.direction = Direction.UP;
      this.isIdle = false;
      this.closeDoor();
      this.currentFloor++;
    }
  }

  moveDown(): void {
    if (this.currentFloor > 1) {
      this.direction = Direction.DOWN;
      this.isIdle = false;
      this.closeDoor();
      this.currentFloor--;
    }
  }

  openDoor() {
    if (!this.isIdle) {
      this.doorOpen = true;
    }
  }

  closeDoor() {
    this.doorOpen = false;
  }

  addPassenger(passengerID: string): boolean {
    if (this.passengers.length < this.maxCapacity && this.isIdle) {
      this.passengers.push(passengerID);
      return true;
    } else {
      return false;
    }
  }

  removePassenger(passengerID: string): boolean {
    if (this.isIdle) {
      this.passengers = this.passengers.filter((p) => p != passengerID);
      return true;
    } else {
      return false;
    }
  }

  displayStatus(): void {
    console.log("------------------------------");
    console.log(`Floor : ${this.currentFloor}`);
    console.log(`Direction : ${this.direction}`);
    console.log(`isIdeal : ${this.isIdle}`);
  }
}

type FloorPanel = {
  id: number;
  upButton: boolean | null;
  downButton: boolean | null;
};

class Building {
  private numberFloor: number = 1;
  private elevator: Elevator;
  private floorPanels: FloorPanel[] = [];

  constructor(numberFloor: number) {
    this.numberFloor = numberFloor;
    this.elevator = new Elevator(1, numberFloor, 8);
    // this.floorPanels = this.createFloorPanel(this.numberFloor);
  }

  // createFloorPanel(noOfFloor: number) {
  //   let panels: FloorPanel[] = [];
  //   panels.push({
  //     id: 1,
  //     upButton: false,
  //     downButton: null,
  //   });
  //   for (let i = 2; i < noOfFloor; i++) {
  //     panels.push({
  //       id: i,
  //       upButton: false,
  //       downButton: false,
  //     });
  //   }
  //   panels.push({
  //     id: 10,
  //     upButton: null,
  //     downButton: false,
  //   });

  //   return panels;
  // }

  isValidFloor(floor: number) {
    return floor <= this.numberFloor;
  }

  callElevator(floor: number): void {
    if (this.isValidFloor(floor)) {
      this.elevator.closeDoor();
      if (this.elevator.getCurrentFloor() < floor) {
        while (this.elevator.getCurrentFloor() < floor) {
          this.elevator.moveUp();
          this.elevator.displayStatus();
        }
      } else {
        while (this.elevator.getCurrentFloor() > floor) {
          this.elevator.moveDown();
          this.elevator.displayStatus();
        }
      }
      this.elevator.openDoor();
    }
  }
}

const building = new Building(10);
console.log(building);
console.log(building.callElevator(8));
