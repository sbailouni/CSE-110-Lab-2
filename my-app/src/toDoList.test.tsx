import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoList } from './toDoList';
import { dummyGroceryList } from "./constants";

describe("ToDoList Required Tests", () => {
    test('all items in the list displayed on screen', () => {
        render(<ToDoList />);
      
        const item1 = screen.getByText('Apples');
        const item2 = screen.getByText('Bananas');
      
        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
    });

    test('shows correct number of checked items', () => {
        render(<ToDoList />);
      
        const checkbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox);  
      
        const numChecked = screen.getByText(/Items bought: 1/i);
        expect(numChecked).toBeInTheDocument();
    });
})

describe("ToDoList Edge Case Tests", () => {
    test('items are sorted correctly in order of unchecked first, then checked', () => {
        render(<ToDoList />);

        const checkbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox);

        const uncheckedItems = screen.getAllByRole('checkbox').slice(1);
        uncheckedItems.forEach((item) => {
            expect(item).not.toBeChecked();
        });
    });
})