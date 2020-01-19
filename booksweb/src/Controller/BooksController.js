import AppController from "./AppController";
import { Book } from "../Model";

class BooksController extends AppController {
    async search(search, startIndex = 0) {
        try {
            this.showSpinner();
            const response = await Book.search(search, startIndex);

            this.context.setState({
                "listBooks": response.data.items ? response.data.items : [],
                "totalBooks": response.data.totalItems,
                "bookNotFound": response.data.totalItems === 0 ? `Sem resultados para '${search}'!` : ""
            });
            this.hideSpinner();
        } catch (err) {
            alert(err);
            this.hideSpinner();
        }
    }
}

export default new BooksController();
