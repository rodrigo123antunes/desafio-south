import React, { Component } from "react";
import { Spinner, Paginator } from "../../Component";
import { BooksController } from "../../Controller";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "search": "",
            "startIndex": 0,
            "totalBooks": 0,
            "listBooks": [],
            "bookDetail": {}
        };

        BooksController.setContext(this);
    }

    render() {
        return (
            <>
                <Spinner ref={component => {this.spinner = component;}} />
                <div className="container">
                    <input
                        onChange={(e) => this.setState({"search": e.target.value})}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                BooksController.search(this.state.search);
                            }
                        }}
                        value={this.props.search}
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    this.state.listBooks.map((prop, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{prop.volumeInfo.title}</td>
                                                <td>
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
                                    {this.state.bookDetail.description}
                                    <br />
                                    <p>Autores:</p>
                                    <b>
                                        {this.state.bookDetail.authors}
                                    </b>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Paginator
                        total={this.state.totalBooks}
                        onPress={startIndex => {
                            this.setState({"startIndex": startIndex}, () => {
                                BooksController.search(this.state.search, this.state.startIndex)
                            });
                        }}
                    />
                </div>  
            </>
        )
    }
}