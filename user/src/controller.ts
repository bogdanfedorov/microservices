import typia from 'typia'
import IUser from './model'

export default class UserController {
  public getById(id: string) {
    const user = typia.random<IUser>()
    user.id = id
    user.timezone = 'Europe/Kiev'

    return user
  }
}
