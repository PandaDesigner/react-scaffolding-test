import { useState, useRef } from 'react';

export const useTagInput = (initialTags: string[] = []) => {
    const [tags, setTags] = useState<string[]>(initialTags);
    const [input, setInput] = useState<string>('');
    const [showAllTags, setShowAllTags] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
            setTags(tags.slice(0, -1));
        }
    };

    const addTag = () => {
        const trimmedInput = input.trim();
        if (trimmedInput && !tags.includes(trimmedInput)) {
            setTags([...tags, trimmedInput]);
            setInput('');
            setShowAllTags(false); // Volvemos a la vista compacta después de añadir un tag
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const toggleTagsVisibility = () => {
        setShowAllTags(!showAllTags);
    };

    const handleInputBlur = () => {
        addTag();
        setShowAllTags(false); // Volvemos a la vista compacta al perder el foco
    };

    return {
        tags,
        input,
        showAllTags,
        inputRef,
        setInput,
        handleKeyDown,
        addTag,
        removeTag,
        toggleTagsVisibility,
        handleInputBlur,
    };
};