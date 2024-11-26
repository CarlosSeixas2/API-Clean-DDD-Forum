import { randomUUID } from 'crypto'

export class Entity<Props> {
  private _id: string
  protected props: Props

  constructor(props: Props, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }

  getId(): string {
    return this._id
  }
}
