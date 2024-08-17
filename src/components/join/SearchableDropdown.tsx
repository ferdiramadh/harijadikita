import { useEffect, useRef, useState } from "react";

type SearchableDropdownType = {
    options: any
    label: string
    id: string
    selectedVal: any
    handleChange: any
    isRinPerPage?: boolean
    objectName?: string
}

const SearchableDropdown = ({
    options,
    label,
    id,
    selectedVal,
    handleChange,
    isRinPerPage,
    objectName
}: SearchableDropdownType) => {

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const placeHolder = `${isOpen ? "Cari" : "Pilih"} ${objectName ? objectName : "Bank"}`
    const inputRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", toggle);
        return () => document.removeEventListener("click", toggle);
    }, []);

    const selectOption = (option: any) => {
        setQuery(() => "");
        handleChange(option[label]);
        setIsOpen((isOpen) => !isOpen);
    };

    function toggle(e: any) {
        setIsOpen(e && e.target === inputRef.current);
    }

    const getDisplayValue = () => {
        if (query) return query;
        if (selectedVal) return selectedVal;

        return "";
    };

    const filter = (options: any) => {
        return options.filter(
            (option: any) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    };
    useEffect(() => {
        if (isOpen) {
            handleChange("")
        }
    }, [isOpen])
    return (
        <div className="dropdown" style={isRinPerPage ? { flex: 1, width: '100%' } : {}}>
            <div className="control">
                <div className={isRinPerPage ? "selected-value-full" : "selected-value"}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={getDisplayValue()}
                        name="searchTerm"
                        onChange={(e) => {
                            setQuery(e.target.value);
                            handleChange(null);
                        }}
                        onClick={toggle}
                        placeholder={placeHolder}
                    />
                </div>
                <div className={`arrow ${isOpen ? "open" : ""}`}></div>
            </div>

            <div className={`options ${isOpen ? "open" : ""}`}>
                {filter(options).map((option: any, index: any) => {
                    return (
                        <div
                            onClick={() => selectOption(option)}
                            className={`option ${option[label] === selectedVal ? "selected" : ""
                                }`}
                            key={`${id}-${index}`}
                        >
                            {option[label]}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchableDropdown;
