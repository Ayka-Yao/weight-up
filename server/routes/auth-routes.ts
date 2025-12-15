import { auth } from "../auth/auth";
import { toNodeHandler} from "better-auth/node";



export default toNodeHandler(auth);