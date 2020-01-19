import React, { Component } from "react";
import { Spinner, Paginator } from "../../Component";
import { BooksController } from "../../Controller";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "search": "",
            "bookNotFound": "",
            "startIndex": 0,
            "totalBooks": 0,
            "listBooks": [],
            "bookDetail": {}
        };

        BooksController.setContext(this);
    }

    render() {
        return (
            <div className="container">
                <Spinner ref={component => {this.spinner = component;}} />
                <form className="mt-5">
                    <h5 className="text-secondary text-center">Pesquise livros</h5>
                    <input
                        onChange={(e) => this.setState({"search": e.target.value})}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                if (!this.state.search) {
                                    this.setState({
                                        "listBooks": [],
                                        "totalBooks": 0
                                    });

                                    return;
                                }

                                BooksController.search(this.state.search);
                            }
                        }}
                        value={this.props.search}
                        className="form-control"
                        type="search"
                        placeholder="Informe a pesquisa e pressione ENTER"
                        aria-label="Search"
                    />
                </form>
                <h5>{this.state.bookNotFound}</h5>
                {
                    this.state.listBooks.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Título</th>
                                    <th className="text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        this.state.listBooks.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{prop.volumeInfo.title}</td>
                                                    <td className="text-right">
                                                        <button type="button" className="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal" onClick={() => {
                                                            this.setState({"bookDetail": prop.volumeInfo});
                                                        }}>
                                                            Detalhes
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                            </tbody>
                        </table>
                    ) : null
                }
                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{this.state.bookDetail.title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    this.state.bookDetail.imageLinks ? 
                                        <img className="rounded mx-auto d-block" src={this.state.bookDetail.imageLinks.thumbnail} alt="book-img" width="50%" /> : null
                                }
                                {this.state.bookDetail.description}
                                <br />
                                <br />
                                <p>
                                    Autores: 
                                    <b>
                                        {this.state.bookDetail.authors}
                                    </b>
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.listBooks.length > 0 ? (
                        <Paginator
                            total={this.state.totalBooks}
                            onPress={startIndex => {
                                this.setState({"startIndex": startIndex}, () => {
                                    BooksController.search(this.state.search, this.state.startIndex)
                                });
                            }}
                        />
                    ) : null
                }
            </div>
        )
    }
}