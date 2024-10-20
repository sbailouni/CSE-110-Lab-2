import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });
});

describe("StickyNote Required Tests", () => {
    test("displays all dummy notes", ()=>{
        render(<StickyNotes />);

        const note1 = screen.getByText('test note 1 title');
        const note2 = screen.getByText('test note 2 title');
        const note3 = screen.getByText('test note 3 title');
        const note4 = screen.getByText('test note 4 title');
        const note5 = screen.getByText('test note 5 title');
        const note6 = screen.getByText('test note 6 title');

        expect(note1).toBeInTheDocument();
        expect(note2).toBeInTheDocument();
        expect(note3).toBeInTheDocument();
        expect(note4).toBeInTheDocument();
        expect(note5).toBeInTheDocument();
        expect(note6).toBeInTheDocument();
    })

    test('updates a note on the page', () => {
        render(<StickyNotes />);
      
        const editButton = screen.getAllByText('Edit')[0];
        fireEvent.click(editButton);
      
        const noteContentInput = screen.getByPlaceholderText('Note Content');
        fireEvent.change(noteContentInput, { target: { value: 'Updated note content' } });
      
        const submitButton = screen.getByText('Update Note');
        fireEvent.click(submitButton);
      
        const updatedNoteContent = screen.getByText('Updated note content');
        expect(updatedNoteContent).toBeInTheDocument();
    });

    test('removes a note from the page when deleted', () => {
        render(<StickyNotes />);
      
        const deleteButton = screen.getAllByText('x')[0];
        fireEvent.click(deleteButton);
      
        const deletedNote = screen.queryByText('test note 1 title');
        expect(deletedNote).not.toBeInTheDocument();
    });
});

describe("StickyNote Edge Case Tests", () => {
    test('text entered in the form matches the note', () => {
        render(<StickyNotes />);
    
        fireEvent.change(screen.getByPlaceholderText('Note Title'), { target: { value: 'Test Note' } });
        fireEvent.change(screen.getByPlaceholderText('Note Content'), { target: { value: 'This is a test note.' } });
    
        fireEvent.click(screen.getByText('Create Note'));
    
        expect(screen.getByText('Test Note')).toBeInTheDocument();
        expect(screen.getByText('This is a test note.')).toBeInTheDocument();
    });
})