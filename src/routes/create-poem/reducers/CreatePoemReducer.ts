import { Timestamp } from "firebase/firestore";
import { IPoem } from "../../../interfaces/IPoem";

export const IPoemInitialState: IPoem = {
    author: '',
    id: crypto.randomUUID(),
    image: '',
    content: '',
    title: '',
    timeToRead: '',
    dateCreated: Timestamp.fromDate(new Date())
}

const CreatePoemReducerType = {
    UPDATE_TITLE: 'f9cc027d-38c7-4e04-8226-02a210be29e2',
    UPDATE_CONTENT: 'b074cb72-7624-4b90-8634-7691beac3da3',
    UPDATE_IMAGE: '46ff13fe-307a-47c5-898a-7542f21a4609',
    OVERRIDE_POEM: 'f31921eb-d788-434d-a263-35f01a6d6c65'
} as const;
type CreatePoemReducerTypes = (typeof CreatePoemReducerType)[keyof typeof CreatePoemReducerType];

interface CreatePoemReducerAction {
    type: CreatePoemReducerTypes
    payload: string;
}

export function createPoemReducer(state: IPoem, action: CreatePoemReducerAction): IPoem {
    switch (action.type) {
        case CreatePoemReducerType.UPDATE_TITLE:
            return { ...state, title: action.payload };
        case CreatePoemReducerType.UPDATE_CONTENT:
            return { ...state, content: action.payload };
        case CreatePoemReducerType.UPDATE_IMAGE:
            return { ...state, image: action.payload };
        case CreatePoemReducerType.OVERRIDE_POEM:
            const poem: IPoem = JSON.parse(action.payload);
            return { ...poem }
        default:
            throw new Error("Unknown reducer type");
    }
}

export function updateTitle(name: string): CreatePoemReducerAction {
    return { type: CreatePoemReducerType.UPDATE_TITLE, payload: name }
}

export function updateImage(image: string): CreatePoemReducerAction {
    return { type: CreatePoemReducerType.UPDATE_IMAGE, payload: image }
}

export function updateContent(content: string): CreatePoemReducerAction {
    return { type: CreatePoemReducerType.UPDATE_CONTENT, payload: content }
}

export function overridePoem(poem: IPoem): CreatePoemReducerAction {
    return { type: CreatePoemReducerType.OVERRIDE_POEM, payload: JSON.stringify(poem) }
}