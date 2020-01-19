export default class AppController {
    setContext(context) {
        this.context = context;
    }

    showSpinner() {
        this.context.spinner.showSpinner();
    }

    hideSpinner() {
        this.context.spinner.hideSpinner();
    }

    /**
     * Retorna a instância do state.
     * @return {Object} .
     */
    getState() {
        return this.context.state;
    }
}
