export type Patrol = {
  id?: string
  createdAt: Date
  condominum: string
  ronda: Patroller
  creator: {
    id: string
    username: string
    picture?: string
  }
  start: string
  end: string
  finish: boolean
  payed: boolean
  total: number
  going: number
  coming: number
  updater: {
    id: string
    username: string
    picture?: string
  }
}

export type Patroller = {
  id?: string
  name: string
  address: string
  pix: string
  cellphone: string
}
