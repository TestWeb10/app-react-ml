import { useEffect, useRef } from "react"

function SelectOption({ title, values, contents, defaultValue, setValue, changeValues = false, initialIndex = null, className = "" }) {
    let selectRef = useRef()

    useEffect(() => {
        if (initialIndex !== null) {
            selectRef.current.value = initialIndex
        } else {
            selectRef.current.value = -1
        }
    }, [initialIndex])

    useEffect(() => {
        if (changeValues) {
            selectRef.current.value = -1
            setValue(defaultValue)
        }
    }, [values])

    return (
        <div className="">
            <select ref={selectRef} className={className} onChange={(e) => {
                if (parseInt(e.target.value) !== -1) {
                    let index = parseInt(e.target.value)
                    setValue(values[index])
                } else {
                    setValue(defaultValue)
                }
            }}>
                <option value={-1}>--- {title} ---</option>
                {
                    contents.map((content, index) => (
                        <option value={index} key={index}>{content}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectOption