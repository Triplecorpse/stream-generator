export interface IPersonForm {
  gender: string,
  ageValue?: number,
  ageMinValue: number,
  ageMaxValue: number,
  ageDeviation: number,
  posX: number,
  posY: number,
  posZ: number,
  posDeviation: number,
  lookingAtScreen: boolean,
  qty: number
}
