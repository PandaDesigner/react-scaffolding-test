export interface InputTagProps {
    maxTags?: number;
    onChange?: (tags: Array<string>) => void;
    placeholder?: string;
    initialTags?: Array<string>;
    label?: string;
    id?: string;
    visibleTags?: number;
    mode?: 'input' | 'textarea';
}

export interface UseInputTagProps {
    maxTags?: number;
    onChange?: (tags: string[]) => void;
    initialTags?: string[];
    visibleTags?: number;
    mode?: 'input' | 'textarea';
}