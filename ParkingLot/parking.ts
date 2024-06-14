enum Size {
  "S" = "S",
  "M" = "M",
  "L" = "L",
}

type Slot = {
  id: number;
  size: Size;
  carId: string | null;
};

type EntryPoint = {
  name: string;
  row: number;
  col: number;
};

class ParkingPlot {
  private row: number;
  private col: number;
  private slots: Slot[][];
  private entryPoints: EntryPoint[];

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.slots = Array.from({ length: this.row }, (_, rowIdx) =>
      Array.from({ length: this.col }, (_, colIdx) => ({
        id: rowIdx * this.col + colIdx,
        size: Size.S,
        carId: null,
      }))
    );
    this.entryPoints = [
      {
        name: "A",
        row: 0,
        col: 0,
      },
      {
        name: "B",
        row: 0,
        col: this.col - 1,
      },
      {
        name: "C",
        row: this.row - 1,
        col: this.col - 1,
      },
      {
        name: "D",
        row: this.row - 1,
        col: 0,
      },
    ];
  }

  public canFit(row: number, col: number, vehicleSize: Size): boolean {
    if (this.isSlotValid(row, col)) {
      const spot = this.slots[row][col];
      const sizeHierarchy = { [Size.S]: 1, [Size.M]: 2, [Size.L]: 3 };
      return sizeHierarchy[vehicleSize] <= sizeHierarchy[spot.size];
    } else {
      return false;
    }
  }

  public getAvailable(): number {
    let availableSlots = 0;
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.col; c++) {
        if (this.slots[r][c].carId === null) {
          availableSlots += 1;
        }
      }
    }
    return availableSlots;
  }

  public isFull(): boolean {
    return this.getAvailable() == 0;
  }

  public park(
    vehicleID: string,
    vehicleSize: Size,
    entryPointName: EntryPoint["name"]
  ): boolean {
    const nearestSpot = this.getNearestParkingSpot(vehicleSize, entryPointName);
    if (nearestSpot) {
      const { row, col } = nearestSpot;
      this.slots[row][col].carId = vehicleID;
      return true;
    } else {
      return false;
    }
  }

  public unpark(vehicleID: string): boolean {
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.col; c++) {
        const spot = this.slots[r][c];
        if (spot.carId === vehicleID) {
          this.slots[r][c] = { ...spot, carId: null };
          return true;
        }
      }
    }
    return false;
  }

  private getNearestParkingSpot(
    vehicleSize: Size,
    entryPointName: EntryPoint["name"]
  ): { row: number; col: number } | null {
    let nearestSpot: { row: number; col: number } | null = null;
    let minDistance = Infinity;
    let validEntrypoint = this.entryPoints.find(
      (entryPoint) => entryPoint.name === entryPointName
    );
    if (!validEntrypoint) {
      return null;
    }
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.col; c++) {
        const distance =
          Math.abs(validEntrypoint.row - r) + Math.abs(validEntrypoint.col - c);

        if (
          distance < minDistance &&
          this.canFit(r, c, vehicleSize) &&
          this.slots[r][c].carId == null
        ) {
          nearestSpot = { row: r, col: c };
          minDistance = distance;
        }
      }
    }
    return nearestSpot;
  }

  public setParkingSize(row: number, col: number, size: Size): boolean {
    if (this.isSlotValid(row, col)) {
      this.slots[row][col].size = size;
      return true;
    } else {
      return false;
    }
  }

  private isSlotValid(row: number, col: number): boolean {
    return row >= 0 && row < this.row && col >= 0 && col < this.col;
  }

  public findVehicle(vehicleId: string): { row: number; col: number } | null {
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.col; c++) {
        if (this.slots[r][c] && this.slots[r][c].carId === vehicleId) {
          return { row: r, col: c };
        }
      }
    }
    return null;
  }
}

const parking1 = new ParkingPlot(2, 3);

console.log(
  parking1.setParkingSize(0, 0, Size.M) == true ? "size set" : "size not set"
);

console.log(parking1.park("XYZ", Size.M, "A") ? "parked" : "not parked");

console.log(parking1.findVehicle("XYZ"));
