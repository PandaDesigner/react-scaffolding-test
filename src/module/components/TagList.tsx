import React from 'react';

interface TagListProps {
    tags: string[];
    maxVisibleTags?: number;
    multiline: boolean;
    showAllTags: boolean;
    removeTag: (tag: string) => void;
    toggleTagsVisibility: () => void;
}

const TagList: React.FC<TagListProps> = ({
    tags,
    maxVisibleTags,
    multiline,
    showAllTags,
    removeTag,
    toggleTagsVisibility,
}) => {
    let tagsToRender = tags;
    let hasMore = false;

    if (!multiline && !showAllTags && maxVisibleTags && tags.length > maxVisibleTags) {
        tagsToRender = tags.slice(0, maxVisibleTags);
        hasMore = true;
    }

    return (
        <>
            {tagsToRender.map((tag, index) => (
                <span
                    key={index}
                    className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-2 py-0 rounded-md mr-1 mb-1"
                >
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 p-[8px] text-blue-600 hover:text-blue-800"
                    >
                        ×
                    </button>
                </span>
            ))}
            {hasMore && (
                <button
                    onClick={toggleTagsVisibility}
                    className="inline-flex items-center bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-md hover:bg-gray-200"
                >
                    +{tags.length - (maxVisibleTags || 0)}
                </button>
            )}
        </>
    );
};

export default TagList;