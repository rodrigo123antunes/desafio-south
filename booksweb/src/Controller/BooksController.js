import AppController from "./AppController";
import { Book } from "../Model";

class BooksController extends AppController {
    async search(search, startIndex = 0) {
        try {
            this.showSpinner();
            const response = await Book.search(search, startIndex);

            console.log(response.data);

            this.context.setState({
                "listBooks": response.data.items,
                "totalBooks": response.data.totalItems
            })
            this.hideSpinner();
        } catch (err) {
            console.log(err);
            alert(err.detail);
            this.hideSpinner();
        }
    }
}

export default new BooksController();
