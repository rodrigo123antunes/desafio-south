import { Http, Constants } from "../Util";

export default class AppModel {

    constructor() {
        this._http = Http;
        this._constants = Constants;
    }
}
