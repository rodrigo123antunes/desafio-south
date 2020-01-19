import { Constants } from "../Util";
import axios from "axios";

class Book {
    search(search, startIndex) {
        return axios({
            url: `${Constants.API_URL}${search}&key=${Constants.API_BOOKS}&startIndex=${startIndex}&maxResults=40`,
            method: 'get'
          });
    }
}

export default new Book();
