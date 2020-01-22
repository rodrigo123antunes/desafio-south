import React, { Component } from "react";
import { Spinner, Paginator } from "../../Component";
import { BooksController } from "../../Controller";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "search": "",
            "bookNotFound": "",
            "tabSelected": 0,
            "startIndex": 0,
            "totalBooks": 0,
            "listBooks": [],
            "listBooksFavorites": [],
            "listBooksFavoritesAux": [],
            "bookDetail": {}
        };

        BooksController.setContext(this);
    }

    search(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            if (!this.state.search) {
                this.setState({
                    "listBooks": [],
                    "totalBooks": 0
                });

                return;
            }

            BooksController.search(this.state.search);
        }
    }

    render() {
        const favorites = this.state.listBooks.filter(e => e.active === true);
        return (
            <div className="container">
                <form className="mt-5">
                    <h5 className="text-secondary text-center">Pesquise livros</h5>
                    <div className="input-group mb-3">
                        <input
                            data-testid="field-search"
                            onChange={(e) => this.setState({"search": e.target.value})}
                            onKeyDown={(e) => this.search(e)}
                            value={this.state.search}
                            className="form-control"
                            placeholder="Informe a pesquisa e pressione ENTER"
                            aria-label="Search"
                        />
                        <div className="input-group-append">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!this.state.search) {
                                        this.setState({
                                            "listBooks": [],
                                            "totalBooks": 0
                                        });
                        
                                        return;
                                    }

                                    BooksController.search(this.state.search);
                                }}
                                data-testid="btn-search"
                                className="btn btn-outline-secondary">Buscar</button>
                        </div>
                    </div>
                </form>
                <ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="search-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" onClick={() => this.setState({"search": "", "tabSelected": 0})}>Busca</a>
                    </li>
                    <li className="nav-item" onClick={() => this.setState({"search": ""})}>
                        <a className="nav-link" id="favorite-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" onClick={() => this.setState({"search": "", "tabSelected": 1})}>Favoritos</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="search-tab">
                        <h5>{this.state.bookNotFound}</h5>
                        {
                            this.state.listBooks.length > 0 ? (
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Título</th>
                                            <th className="text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody id="show">
                                        {
                                            this.state.listBooks.map((prop, key) => {
                                                if (!prop.active) {
                                                    prop.active = false;
                                                }
                                                return (
                                                    <tr key={key} data-testid="row-list">
                                                        <td data-toggle="modal" data-target="#exampleModal" className="cursor-pointer" onClick={() => {
                                                            this.setState({
                                                                "bookDetail": prop.volumeInfo
                                                            });
                                                        }}>
                                                            {prop.volumeInfo.title}
                                                        </td>
                                                        <td className="text-right">
                                                            <button key={"btn-show"} type="button" className={`${prop.active ? "active" : "" } btn btn-outline-danger`} onClick={() => {
                                                                prop.active = !prop.active;

                                                                this.setState({
                                                                    "bookDetail": prop.volumeInfo,
                                                                    "listBooks": this.state.listBooks,
                                                                });
                                                            }}>
                                                                {prop.active ? "Desfavoritar" : "Favoritar"}
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
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="favorite-tab">
                        {
                            favorites.length > 0 ? (
                                <table className="table table-hover mt-2">
                                    <thead>
                                        <tr>
                                            <th scope="col">Título</th>
                                            <th className="text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                favorites.map((prop, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td data-toggle="modal" data-target="#exampleModal" className="cursor-pointer" onClick={() => {
                                                                this.setState({
                                                                    "bookDetail": prop.volumeInfo
                                                                });
                                                            }}>
                                                                {prop.volumeInfo.title}
                                                            </td>
                                                            <td className="text-right">
                                                            <button type="button" className={`${prop.active ? "active" : "" } btn btn-outline-danger`} onClick={() => {
                                                                prop.active = !prop.active;

                                                                this.setState({
                                                                    "bookDetail": prop.volumeInfo,
                                                                    "listBooks": this.state.listBooks,
                                                                });
                                                            }}>
                                                                {prop.active ? "Desfavoritar" : "Favoritar"}
                                                            </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                    </tbody>
                                </table>
                            ) : <h5>Ainda não existem favoritos</h5>
                        }
                    </div>
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
                </div>
                <Spinner ref={component => {this.spinner = component;}} />
            </div>
        )
    }
}