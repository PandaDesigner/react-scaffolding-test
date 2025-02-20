import React from 'react';
import { X } from 'lucide-react';
import { useInputTag } from './useInputTag';
import styles from './InputTag.module.css';
import { InputTagProps } from './type';

const InputTag: React.FC<InputTagProps> = ({
    maxTags = 10,
    onChange = () => { },
    placeholder = 'Añadir tag...',
    initialTags = [],
    label = "imagen del texto forma completa",
    id = 'tag-input',
    visibleTags = 3,
    mode = 'input',
}) => {
    const {
        tags,
        input,
        isExpanded,
        inputRef,
        containerRef,
        visibleTagsList,
        hiddenTagsCount,
        setInput,
        setIsExpanded,
        removeTag,
        handleKeyDown,
        handlePaste,
        handleContainerClick,
    } = useInputTag({ maxTags, onChange, initialTags, visibleTags, mode });

    const TagItem = ({ tag, index }: { tag: string; index: number }) => (
        <span className={styles.tagItem} data-tag={tag}>
            {tag}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    removeTag(index);
                }}
                className={styles.removeButton}
            >
                <X size={14} />
            </button>
        </span>
    );

    return (
        <div className={styles.container}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
            <div
                ref={containerRef}
                onClick={handleContainerClick}
                className={`${styles.inputContainer} ${mode === 'textarea' ? styles.minHeight : isExpanded ? styles.minHeight : styles.height}`}
            >
                <div
                    className={`${styles.containerInner} ${mode === 'textarea' || isExpanded ? styles.overflowAuto : styles.overflowHidden}`}
                >
                    {(mode === 'textarea' || isExpanded) ? (
                        tags.map((tag, index) => (
                            <TagItem key={index} tag={tag} index={index} />
                        ))
                    ) : (
                        visibleTagsList.map((tag, index) => (
                            <TagItem key={index} tag={tag} index={index} />
                        ))
                    )}

                    <input
                        id={id}
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        placeholder={tags.length === 0 ? placeholder : ''}
                        className={`${styles.input} ${mode === 'textarea' ? styles.textarea : styles.input}`}
                    />
                </div>

                {mode === 'input' && !isExpanded && hiddenTagsCount > 0 && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(true);
                            inputRef.current?.focus();
                        }}
                        className={styles.expandButton}
                    >
                        +{hiddenTagsCount}
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputTag;