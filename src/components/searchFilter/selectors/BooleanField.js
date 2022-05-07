import { useEffect, useMemo, useState } from "react"
import { Dropdown, DropdownButton, FormControl, Image, InputGroup } from "react-bootstrap"
import OperatorDropdown from '../../general/OperationDropdown'
import Select from 'react-select'

export default function BooleanField({ type = {}, filter, setFilter }) {
    const [operator, setOperator] = useState(filter[type]?.operation || 'eq')
    const [value, setValue] = useState(filter[type]?.term ?? 1)

    useEffect(() => {
        setFilter(prev => ({
            ...prev,
            [type.value]: value === "" || typeof value == 'undefined' ? undefined : { term: value, operation: operator },
        }))
    }, [operator, value])

    return <>
        <InputGroup.Text>
            {type.label}
        </InputGroup.Text>
        <OperatorDropdown {...{ operator, setOperator, type: 'number' }} />
        <div className="react-select form-control p-0">
            <Select options={[{ value: true, label: 'True' }, { value: false, label: 'False' }]} onChange={(obj) => setValue(obj.value)} />
        </div>
    </>
}
