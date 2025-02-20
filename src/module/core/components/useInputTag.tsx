import { useState, useRef, useEffect } from 'react';
import { UseInputTagProps } from './type';

export const useInputTag = ({
    maxTags = 10,
    onChange = () => { },
    initialTags = [],
    visibleTags = 3,
    mode = 'input',
}: UseInputTagProps) => {
    const [tags, setTags] = useState<string[]>(initialTags);
    const [input, setInput] = useState<string>('');
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const visibleTagsList = tags.slice(0, visibleTags);
    const hiddenTagsCount = Math.max(0, tags.length - visibleTags);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (mode === 'input') {
                    setIsExpanded(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mode]);

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim();
        if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
            const newTags = [...tags, trimmedTag];
            setTags(newTags);
            onChange(newTags);
            setInput('');
        }
    };

    const removeTag = (indexToRemove: number) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
        onChange(newTags);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(input);
        } else if (e.key === 'Backspace' && !input && tags.length > 0) {
            removeTag(tags.length - 1);
        } else if (e.key === 'Escape' && mode === 'input') {
            setIsExpanded(false);
            inputRef.current?.blur();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        const pastedTags = pastedText.split(/[,\n]/).map(tag => tag.trim());

        pastedTags.forEach(tag => {
            if (tag && tags.length < maxTags) {
                addTag(tag);
            }
        });
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('container-inner')) {
            inputRef.current?.focus();
        }
    };

    return {
        tags,
        input,
        isExpanded,
        inputRef,
        containerRef,
        visibleTagsList,
        hiddenTagsCount,
        setInput,
        setIsExpanded,
        addTag,
        removeTag,
        handleKeyDown,
        handlePaste,
        handleContainerClick,
    };
};