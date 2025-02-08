import React from 'react';
import { useTagInput } from './useTagInput';
import TagList from './TagList';

import InputContainer from './InputContainer';
import { TagInputProps } from './tagInput.types';

const TagInput: React.FC<TagInputProps> = ({
    multiline = false,
    maxVisibleTags,
    className = "",
    placeholder = "Add tags...",
}) => {
    const {
        tags,
        input,
        showAllTags,
        inputRef,
        setInput,
        handleKeyDown,
        removeTag,
        toggleTagsVisibility,
        handleInputBlur,
    } = useTagInput();

    return (
        <InputContainer className={className}>
            <div
                className={`border rounded-lg p-2 ${multiline || showAllTags ? 'min-h-[100px]' : ''}`}
            >
                <div
                    className={`flex flex-wrap gap-1 ${!multiline && !showAllTags ? 'overflow-x-auto' : ''}`}
                >
                    <TagList
                        tags={tags}
                        maxVisibleTags={maxVisibleTags}
                        multiline={multiline}
                        showAllTags={showAllTags}
                        removeTag={removeTag}
                        toggleTagsVisibility={toggleTagsVisibility}
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleInputBlur}
                        placeholder={tags.length === 0 ? placeholder : ''}
                        className="outline-none border-none flex-1 min-w-[120px]"
                    />
                </div>
            </div>
        </InputContainer>
    );
};

export default TagInput;
