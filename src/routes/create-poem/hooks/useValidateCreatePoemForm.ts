import { IPoem } from "../../../interfaces/IPoem";


export default function validateForm(poemFormState: IPoem) {

    const errors: { [key: string]: string } = {
        author: validateIsRequired(poemFormState.title) ? "Title" : "",
        image: validateIsRequired(poemFormState.image) ? "Image" : "",
        content: validateIsRequired(poemFormState.content) ? "Content" : ""
    }

    if (!errors.author) delete errors.author;
    if (!errors.image) delete errors.image;
    if (!errors.content) delete errors.content;

    return errors;
}

function validateIsRequired(value: string): boolean {
    return !value;
}