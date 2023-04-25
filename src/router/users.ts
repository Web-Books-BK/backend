import { Express, NextFunction, Request, Response , Router} from "express";

const router = Router();

router.get("/signin", (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch(err) {
        console.error("POST /signin, error: ", err);
        return res.status(404).json({message: (err as Error).message})
    }
})

router.get("/signup", (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch(err) {
        console.error("POST /signup, error: ", err);
        return res.status(404).json({message: (err as Error).message})
    }
})
