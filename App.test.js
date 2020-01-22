import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Home from './View/Page/Home';
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
        // buscar a tabela
        const tdNode = await waitForElement(() => getByText(inputValue));
        // verificar se a tarefa foi adicionada na tabela
        expect(tdNode).toBeDefined();
    });
});
