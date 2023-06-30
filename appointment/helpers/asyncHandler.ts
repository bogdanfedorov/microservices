import { Response, NextFunction, Request } from 'express'

export function asyncRout(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | any,
) {
  return (req, res, next) => {
    fn(req, res, next)
      .then((result) => {
        if (!result) return res.status(404).json({ message: 'Not found' })
        res.status(200).json(result)
      })
      .catch(next)
  }
}
