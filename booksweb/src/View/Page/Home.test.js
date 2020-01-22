import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Home from './Home';
const inputValue = "sprint"
describe("Tests for home component", () => {
    it("Should change input value", async () => {
        const { getByTestId } = render(<Home />);
        // buscar o input
        const fieldNode = await waitForElement(
            () => getByTestId("field-search")
        )
        // digitar no input
        fireEvent.change(fieldNode, {target: {value: inputValue}})
        // resultado esperado
        expect(fieldNode.value).toEqual(inputValue);
    });

    it("Should submit form", async () => {
        const { getByTestId, getByText } = render(<Home />);
        // buscar o botao
        const btnNode = await waitForElement(() => getByTestId("btn-search"));
        // clicar no botao
        fireEvent.click(btnNode);
        // após 3 segundos buscar a tabela
        setTimeout(async () => {
            const tdNode = await waitForElement(() => getByText(inputValue));
            // verificar se o livro existe na tabela
            expect(tdNode).toBeDefined();
        }, 3000);
    });
});
