import { endpoints as phpEndPoints } from "./phpServices";
import { endpoints as csEndPoints } from "./csServices";

const API_INTERFACE = process.env.REACT_APP_API_INTERFACE;

let endPoints = phpEndPoints;

if (API_INTERFACE === "CS") {
    endPoints = csEndPoints;
}

export default endPoints;