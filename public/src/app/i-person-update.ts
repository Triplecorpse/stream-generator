export interface IPersonUpdate {
  camera_id: "Camera: USB 0",
  coordinates: {
    x: number,
    y: number,
    z: number
  },
  local_timestamp: Date,
  person_id: string,
  person_put_id: string,
  poi: number,
  record_type: string,
  rolling_expected_values?: {
    age: number,
    gender: string
  },
  behavior: {
    head: {
      looking_at_screen: number,
    },
    body: {
      raising_right_hand: number,
      raising_left_hand: number
    }
  }
}
